import {useRef, useEffect, useState} from 'react'
import { QRCodeSVG } from 'qrcode.react';
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

import './App.css'

const port = 5001
const api_key = import.meta.env.VITE_MAPBOX_API_KEY;
let url = 'http://192.168.178.178';
const LocalIpFromControllerWithPort = 'http://192.168.178.178:5173/';

const sprayDotSVG = (color) => `
<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke="${color}" stroke-width="3">
    <circle cx="20" cy="20" r="10" />
    <circle cx="20" cy="20" r="3" fill="${color}"/>
  </g>
</svg>`;

const tipoColores = {
    "Represión policial": "#FF3333",
    "Accidente": "#FFCC00",
    "Violencia urbana": "#3399FF",
    "Street Art": "#33CC66",
    "Otro": "#AAAAAA"
};

function App() {
    const mapRef = useRef();
    const mapContainerRef = useRef();
    const markersRef = useRef(new Map());
    const [cases, setCases] = useState([]);

    useEffect(() => {
        mapboxgl.accessToken = api_key;
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [-74.0, 4.6],
            zoom: 5
        });

        mapRef.current.on('load', () => {
            fetch(`${url}:${port}/cases`)
                .then(res => res.json())
                .then(fetchedCases => {
                    setCases(fetchedCases);
                    fetchedCases.forEach(c => {
                        const color = tipoColores[c.tipo] || tipoColores["Otro"];
                        const popupContent = `
                          <div style="max-width: 500px; width: 90vw; display: flex; flex-direction: column;">
                            <h3 style="margin: 0 0 10px 0;">${c.nombre}</h3>
                            <div style="position:relative;">
                              <img src="${url}:5001${c.imagen}"  style="width: 100%; height: auto; max-height: 300px; border-radius: 5px; object-fit: cover;" />
                              <div style="position:absolute; bottom:7px; right:5px; background: rgba(0,0,0,0.7); color: #fff; font-size: 0.8em; padding: 3px 6px; border-radius: 3px;">
                                ${c.creditos || ""}
                              </div>
                            </div>
                            <p style="margin-top: 10px;">${c.detalle}</p>
                            <div style="background:${color}; color:#fff; padding:5px 10px; border-radius:5px; font-weight:bold; margin-bottom:10px; text-align:center;">
                              ${c.tipo}
                            </div>
                          </div>
                        `;
                        const el = document.createElement('div');
                        el.innerHTML = sprayDotSVG(color);
                        el.style.width = '40px';
                        el.style.height = '40px';
                        el.style.cursor = 'pointer';

                        const popup = new mapboxgl.Popup().setHTML(popupContent);

                        const marker = new mapboxgl.Marker({ element: el })
                            .setLngLat([c.lng, c.lat])
                            .setPopup(popup)
                            .addTo(mapRef.current);

                        markersRef.current.set(c.id, marker);
                    });
                });

            // Iniciar WebSocket después de cargar todo
            const ws = new WebSocket(`ws://192.168.178.178:${port}`);
            ws.onmessage = (message) => {
                const focus = JSON.parse(message.data);
                mapRef.current.flyTo({
                    center: [focus.lng, focus.lat],
                    zoom: 13,
                    speed: 0.8
                });
                markersRef.current.forEach(m => m.getPopup().remove());
                const marker = markersRef.current.get(focus.id);
                if (marker) {
                    marker.getPopup().addTo(mapRef.current);
                }
            }
        });

        return () => mapRef.current.remove();
    }, []);

    return (
        <>
            <div id="map-container" ref={mapContainerRef} />
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgb(255, 255, 255)',
                padding: '10px',
                borderRadius: '8px'
            }}>
                <QRCodeSVG value={`${LocalIpFromControllerWithPort}`} size={128} fgColor={'#ffffff'} bgColor={'#454545'} title={"Steuerung öffnen"} />,
                <div style={{ fontSize: '0.8em', marginTop: '5px', textAlign: 'center' }}>
                    🎛 Steuerung öffnen
                </div>
            </div>
        </>
    );
}

export default App;

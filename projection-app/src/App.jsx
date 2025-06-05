import {useRef, useEffect, useState} from 'react'
import { QRCodeSVG } from 'qrcode.react';
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

import './App.css'

const wss_url = 'installation-map.onrender.com'
const api_key = import.meta.env.VITE_MAPBOX_API_KEY;

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
            fetch(`${import.meta.env.VITE_API_URL}/cases`)
                .then(res => res.json())
                .then(fetchedCases => {
                    setCases(fetchedCases);
                    fetchedCases.forEach(c => {
                        const color = tipoColores[c.tipo] || tipoColores["Otro"];
                        const popupContent = `
                          <div style="max-width: 500px; width: 90vw; display: flex; flex-direction: column;">
                            <h3>${c.creditos || ""}</h3>
                            <h4>${c.nombre} ${c.fecha ? "-" + c.año : ""}</h4>
                            <div style="position:relative; margin-top: 10px;">
                              <img src="${import.meta.env.VITE_API_URL}${c.imagen}"  style="width: 100%; height: auto; max-height: 300px; border-radius: 5px; object-fit: cover;" />
                            </div>
                            <p class="detalle">${c.detalle}</p>
                            <p style="margin-top: 5px; font-size: 0.9em; color: #666; margin-bottom: 0;">${c.ubicacion}</p>
                          </div>
                        `;
                        const el = document.createElement('div');
                        el.innerHTML = sprayDotSVG(color);
                        el.style.width = '40px';
                        el.style.height = '40px';
                        el.style.cursor = 'pointer';

                        const popup = new mapboxgl.Popup({
                            offset: [0, -20], // Adjusts the popup position to stay visible
                            maxWidth: '500px',
                            closeButton: false,
                            className: 'toxic-popup',
                        }).setHTML(popupContent);

                        const marker = new mapboxgl.Marker({ element: el })
                            .setLngLat([c.lng, c.lat])
                            .setPopup(popup)
                            .addTo(mapRef.current);

                        markersRef.current.set(c.id, marker);
                    });
                });

            // Iniciar WebSocket después de cargar todo
            const ws = new WebSocket(`wss://${wss_url}`);
            ws.onmessage = (message) => {
                const focus = JSON.parse(message.data);
                const offsetLat = 0.01; // Adjust this value to move the map slightly upward
                mapRef.current.flyTo({
                    center: [focus.lng, focus.lat + offsetLat],
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
                <QRCodeSVG value={`https://installation-map-controller.onrender.com/`} size={128} fgColor={'#000000'} bgColor={'#ffffff'} title={"Open Controller"} />,
                <div style={{ fontSize: '0.8em', marginTop: '5px', textAlign: 'center' }}>
                    🎛 Steuerung öffnen
                </div>
            </div>
        </>
    );
}

export default App;

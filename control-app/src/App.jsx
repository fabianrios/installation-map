import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [cases, setCases] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [selectedLugar, setSelectedLugar] = useState("Todos");
    const [selectedArtista, setSelectedArtista] = useState("Todos");


    useEffect(() => {
        fetch('http://192.168.178.196:5001/cases')
            .then(res => res.json())
            .then(data => {
                setCases(data);
                setFiltered(data);
            });
    }, [])

    const focus = (c) => {
        fetch('http://192.168.178.196:5001/focus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: c.id, lat: c.lat, lng: c.lng, nombre: c.nombre })
        }).then(() => {
            console.log(`Focusing on ${c.nombre}`)
        })
    }

    const lugares = ["Todos", ...Array.from(new Set(cases.map(c => c.lugar)))];
    const artistas = ["Todos", ...Array.from(new Set(cases.map(c => c.creditos)))];

    const handleFilter = (lugar, artista) => {
        let result = cases;
        if (lugar !== "Todos") result = result.filter(c => c.lugar === lugar);
        if (artista !== "Todos") result = result.filter(c => c.creditos === artista);
        setFiltered(result);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Street Art Control</h1>


            {/* FILTRO DE CIUDADES */}
            <div style={{ marginBottom: '10px' }}>
                <label>Filtrar por ciudad: </label>
                <select value={selectedLugar} onChange={(e) => {
                    setSelectedLugar(e.target.value);
                    handleFilter(e.target.value, selectedArtista);
                }}>
                    {lugares.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
            </div>

            {/* FILTRO DE ARTISTAS */}
            <div style={{ marginBottom: '20px' }}>
                <label>Filtrar por artista: </label>
                <select value={selectedArtista} onChange={(e) => {
                    setSelectedArtista(e.target.value);
                    handleFilter(selectedLugar, e.target.value);
                }}>
                    {artistas.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {filtered.map(c => {
                    const truncatedDetalle = c.detalle.split(" ").slice(0, 30).join(" ") + (c.detalle.split(" ").length > 30 ? "…" : "");

                    return (
                        <div key={c.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', background: '#fafafa' }}>
                            <h3>{c.nombre}</h3>
                            <p style={{ margin: '5px 0', color: '#555' }}>{c.lugar} • {c.año}</p>

                            <div style={{
                                display: 'inline-block',
                                backgroundColor: '#333',
                                color: '#fff',
                                padding: '3px 8px',
                                borderRadius: '5px',
                                marginBottom: '10px',
                                fontSize: '0.85rem'
                            }}>
                                {c.tipo}
                            </div>

                            <p style={{ fontSize: '0.9rem', color: '#666' }}>{truncatedDetalle}</p>

                            <button onClick={() => focus(c)} style={{ marginTop: '10px', padding: '10px', fontSize: '1rem', width: '100%' }}>Enfocar</button>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default App

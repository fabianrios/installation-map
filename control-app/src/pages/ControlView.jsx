import { useEffect, useState } from 'react';
import { FaSlidersH } from 'react-icons/fa';
import FilterBar from '../components/FilterBar';
import CaseCard from '../components/CaseCard';

function ControlView() {
    const [cases, setCases] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [selectedLugar, setSelectedLugar] = useState("Todos");
    const [selectedArtista, setSelectedArtista] = useState("Todos");

    useEffect(() => {
        fetch(`http://${window.location.hostname}:5001/cases`)
            .then(res => res.json())
            .then(data => {
                setCases(data);
                setFiltered(data);
            });
    }, []);

    const focus = (c) => {
        fetch(`http://${window.location.hostname}:5001/focus`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: c.id, lat: c.lat, lng: c.lng, nombre: c.nombre })
        })
    }

    const lugares = ["Todos", ...Array.from(new Set(cases.map(c => c.lugar)))];
    const artistas = ["Todos", ...Array.from(new Set(cases.map(c => c.creditos)))];

    const handleFilter = (lugar, artista) => {
        setSelectedLugar(lugar);
        setSelectedArtista(artista);
        let result = cases;
        if (lugar !== "Todos") result = result.filter(c => c.lugar === lugar);
        if (artista !== "Todos") result = result.filter(c => c.creditos === artista);
        setFiltered(result);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Map controller <FaSlidersH/></h1>

            <FilterBar
                lugares={lugares}
                artistas={artistas}
                selectedLugar={selectedLugar}
                selectedArtista={selectedArtista}
                onFilterChange={handleFilter}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {filtered.map(c => <CaseCard key={c.id} c={c} onFocus={focus} />)}
            </div>
        </div>
    );
}

export default ControlView;

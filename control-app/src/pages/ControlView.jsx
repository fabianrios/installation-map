import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSlidersH } from 'react-icons/fa';
import FilterBar from '../components/FilterBar';
import CaseCard from '../components/CaseCard';
import '../styles/ControlView.css';

const url = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const MASTER_TOKEN = "toxicris";  // <- This is your master token

function ControlView() {
    const [cases, setCases] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [selectedLugar, setSelectedLugar] = useState("All");
    const [selectedArtista, setSelectedArtista] = useState("All");
    const navigate = useNavigate();

    useEffect(() => {
        // Check for bypass
        const params = new URLSearchParams(location.search);
        const bypass = params.get('bypass');
        if (bypass === MASTER_TOKEN) {
            localStorage.setItem('token', MASTER_TOKEN);
        }

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/control-auth');
            return;
        }

        // optionally: verify token with server here

        fetch(`${url}/cases`)
            .then(res => res.json())
            .then(data => {
                setCases(data);
                setFiltered(data);
            });
    }, [navigate]);

    const focus = (c) => {
        const token = localStorage.getItem('token');
        fetch(`${url}/focus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id: c.id, lat: c.lat, lng: c.lng, nombre: c.nombre })
        });
    };

    const lugares = ["All", ...Array.from(new Set(cases.map(c => c.lugar)))];
    const artistas = ["All", ...Array.from(new Set(cases.map(c => c.creditos)))];

    const handleFilter = (lugar, artista) => {
        setSelectedLugar(lugar);
        setSelectedArtista(artista);
        let result = cases;
        if (lugar !== "All") result = result.filter(c => c.lugar === lugar);
        if (artista !== "All") result = result.filter(c => c.creditos === artista);
        setFiltered(result);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Toxicómano</h1>
            <h2>Resistance in public space <FaSlidersH className="svg"/></h2>
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

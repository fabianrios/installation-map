import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import { FaEye } from 'react-icons/fa';
import CaseCard from '../components/CaseCard';

const url = import.meta.env.VITE_API_URL || 'http://localhost:5001';

function VisitorView() {
    const [cases, setCases] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [selectedLugar, setSelectedLugar] = useState("All");
    const [selectedArtista, setSelectedArtista] = useState("All");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${url}/cases`)
            .then(res => res.json())
            .then(data => {
                setCases(data);
                setFiltered(data);
            });
    }, []);

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
            <h2>Resistance in public space <FaEye className="svg"/></h2>

            <FilterBar
                lugares={lugares}
                artistas={artistas}
                selectedLugar={selectedLugar}
                selectedArtista={selectedArtista}
                onFilterChange={handleFilter}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {filtered.map(c => (
                    <div
                        key={c.id}
                        onClick={() => navigate(`/mural/${c.id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <CaseCard small={true} c={c} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VisitorView;

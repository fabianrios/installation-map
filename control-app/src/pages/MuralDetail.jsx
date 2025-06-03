import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

function MuralDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mural, setMural] = useState(null);

    useEffect(() => {
        fetch(`http://${window.location.hostname}:5001/cases/${id}`)
            .then(res => res.json())
            .then(data => {
                setMural(data);
            });
    }, [id]);

    if (!mural) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}><FaArrowLeft /> Volver</button>
            <h2>{mural.nombre}</h2>
            <p><b>{mural.lugar}</b> ({mural.año})</p>
            <img src={`http://${window.location.hostname}:5001${mural.imagen}`} alt={mural.nombre} style={{ maxWidth: '100%', borderRadius: '10px', marginBottom: '20px' }} />
            <p style={{ fontSize: '1.1rem' }}>{mural.detalle}</p>
            <div style={{
                marginTop: '20px',
                background: '#333',
                color: '#fff',
                padding: '8px 15px',
                borderRadius: '5px',
                display: 'inline-block'
            }}>
                {mural.tipo}
            </div>
            <p style={{ marginTop: '10px', fontStyle: 'italic' }}>Créditos: {mural.creditos}</p>
        </div>
    );
}

export default MuralDetail;

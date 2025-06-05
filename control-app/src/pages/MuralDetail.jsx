import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useTranslation } from '../LanguageContext';

function MuralDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mural, setMural] = useState(null);
    const t = useTranslation();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/cases/${id}`)
            .then(res => res.json())
            .then(data => {
                setMural(data);
            });
    }, [id]);

    if (!mural) return <div>{t.loading}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
                <FaArrowLeft /> {t.back}
            </button>
            <h2>{mural.nombre}</h2>
            <p><b>{mural.lugar}</b> ({mural.año})</p>
            <img
                src={`${import.meta.env.VITE_API_URL}${mural.imagen}`}
                alt={mural.nombre}
                style={{ maxWidth: '100%', borderRadius: '10px', marginBottom: '20px' }}
            />
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
            <p style={{ marginTop: '10px', fontStyle: 'italic' }}>
                {t.credits}: {mural.creditos}
            </p>
        </div>
    );
}

export default MuralDetail;

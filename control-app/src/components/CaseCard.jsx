function CaseCard({ c, onFocus }) {
    const truncatedDetalle = c.detalle.split(" ").slice(0, 30).join(" ") + (c.detalle.split(" ").length > 30 ? "…" : "");

    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', background: '#fafafa' }}>
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

            {onFocus &&
                <button onClick={() => onFocus(c)} style={{ marginTop: '10px', padding: '10px', fontSize: '1rem', width: '100%' }}>
                    Enfocar
                </button>
            }
        </div>
    );
}

export default CaseCard;

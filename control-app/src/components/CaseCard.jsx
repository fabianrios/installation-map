// import the caseCard.css and apply it to the component
import '../styles/CaseCard.css'; // Assuming you have a CSS file for styles



function CaseCard({ c, onFocus }) {
    const truncatedDetalle = c.detalle.split(" ").slice(0, 20).join(" ") + (c.detalle.split(" ").length > 20 ? "…" : "");

    return (
        <div className="case-card">
            <h3>{c.nombre}</h3>
            <div
                style={{
                    width: '100%',
                    height: '200px',
                    backgroundImage: `url(http://${window.location.hostname}:5001${c.imagen})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px',
                    marginBottom: '10px',
                }}
            ></div>
            <p style={{ margin: '5px 0', color: '#555' }}>{c.lugar} • {c.año}</p>

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

// import the caseCard.css and apply it to the component
import '../styles/CaseCard.css'; // Assuming you have a CSS file for styles

const url = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function CaseCard({ c, small, onFocus }) {
    const detalle =
        c.idioma === "en" && c.detalle_en
            ? c.detalle_en
            : c.idioma === "de" && c.detalle_de
                ? c.detalle_de
                : c.detalle;
    const truncatedDetalle = detalle.split(" ").slice(0, 20).join(" ") + (detalle.split(" ").length > 20 ? "…" : "");


    return (
        <div className={`case-card${small ? ' small' : ''}`}>
            <h3>{c.nombre}</h3>
            <div
                style={{
                    width: '100%',
                    height: '200px',
                    backgroundImage: `url(${url}${c.imagen})`,
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

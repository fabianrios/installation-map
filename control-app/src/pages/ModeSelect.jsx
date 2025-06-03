import { useNavigate } from 'react-router-dom';
import { FaEye, FaSlidersH } from 'react-icons/fa';
import '../styles/ModeSelect.css';

function ModeSelect() {
    const navigate = useNavigate();

    return (
        <div className="mode-container">
            <h1>Street Art Map</h1>
            <div className="mode-button-group">
                <button className="mode-button" onClick={() => navigate('/visitor')}>
                    <FaEye /> Navegar
                </button>
                <button className="mode-button" onClick={() => navigate('/control-auth')}>
                    <FaSlidersH /> Controlar
                </button>
            </div>
        </div>
    );
}

export default ModeSelect;

import { useNavigate } from 'react-router-dom';
import { FaEye, FaSlidersH } from 'react-icons/fa';
import { useTranslation } from '../LanguageContext';
import '../styles/ModeSelect.css';

function ModeSelect() {
    const navigate = useNavigate();
    const t = useTranslation();

    return (
        <div className="mode-container">
            <h1>Street Art Map</h1>
            <div className="mode-button-group">
                <button className="mode-button" onClick={() => navigate('/visitor')}>
                    <FaEye /> {t.navigate}
                </button>
                <button className="mode-button" onClick={() => navigate('/control-auth')}>
                    <FaSlidersH /> {t.control}
                </button>
            </div>
        </div>
    );
}

export default ModeSelect;

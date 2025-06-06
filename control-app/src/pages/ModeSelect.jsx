import { useNavigate } from 'react-router-dom';
import { FaEye, FaSlidersH } from 'react-icons/fa';
import { useTranslation } from '../LanguageContext';
import {QRCodeSVG} from "qrcode.react";
import '../styles/ModeSelect.css';

function ModeSelect() {
    const navigate = useNavigate();
    const t = useTranslation();

    return (
        <div className="mode-container">
            <h1>Toxicómano</h1>
            <h2>Resistance in public space</h2>
            <div className="mode-button-group">
                <button className="mode-button" onClick={() => navigate('/visitor')}>
                    <FaEye /> {t.navigate}
                </button>
                <button className="mode-button" onClick={() => navigate('/control-auth')}>
                    <FaSlidersH /> {t.control}
                </button>
            </div>
            <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                background: 'white',
                padding: '10px',
                borderRadius: '8px',
                opacity: 0.9,
                zIndex: 999
            }}>
                <QRCodeSVG
                    value="https://www.paypal.com/pools/c/9fuabbv5cW"
                    size={100}
                    fgColor={'#000000'}
                    bgColor={'#ffffff'}
                />
                <p style={{ fontSize: '0.8em', marginTop: '5px', textAlign: 'center', margin: '2px' }}>
                    {t.donate}
                </p>
            </div>
        </div>
    );
}

export default ModeSelect;

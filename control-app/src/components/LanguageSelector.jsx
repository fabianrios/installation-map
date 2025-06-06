import { useLocation } from 'react-router-dom';

function LanguageSelector({ currentLang, setCurrentLang }) {
    const location = useLocation();

    // Hide language selector in /projection route
    if (location.pathname === '/projection') return null;

    return (
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
            <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                style={{ padding: '5px', fontSize: '1rem' }}
            >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
            </select>
        </div>
    );
}

export default LanguageSelector;

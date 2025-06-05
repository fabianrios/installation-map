import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { LanguageContext } from './LanguageContext';
import translations from './translations';

const userLang = (navigator.language || navigator.userLanguage).split('-')[0];
const defaultLang = ['en', 'es', 'de'].includes(userLang) ? userLang : 'en';

function Root() {
    const [currentLang, setCurrentLang] = useState(defaultLang);

    const handleLanguageChange = (e) => {
        setCurrentLang(e.target.value);
    };

    return (
        <LanguageContext.Provider value={translations[currentLang]}>
            <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
                <select value={currentLang} onChange={handleLanguageChange} style={{ padding: '5px', fontSize: '1rem' }}>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="de">Deutsch</option>
                </select>
            </div>
            <StrictMode>
                <App />
            </StrictMode>
        </LanguageContext.Provider>
    );
}

createRoot(document.getElementById('root')).render(<Root />);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageContext } from './LanguageContext';
import translations from './translations';

const userLang = (navigator.language || navigator.userLanguage).split('-')[0];
const currentLang = ['en', 'es', 'de'].includes(userLang) ? userLang : 'en';


createRoot(document.getElementById('root')).render(
    <LanguageContext.Provider value={translations[currentLang]}>
        <StrictMode>
            <App />
        </StrictMode>
    </LanguageContext.Provider>,
)

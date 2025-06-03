import { createContext, useContext } from 'react';
import translations from './translations';

function detectLanguage() {
    const lang = (navigator.language || navigator.userLanguage).split('-')[0];
    if (['en', 'es', 'de'].includes(lang)) {
        return lang;
    }
    return 'en';
}

export const LanguageContext = createContext(translations[detectLanguage()]);
export const useTranslation = () => useContext(LanguageContext);

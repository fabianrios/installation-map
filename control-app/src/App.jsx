import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import ModeSelect from './pages/ModeSelect';
import VisitorView from './pages/VisitorView';
import ControlView from './pages/ControlView';
import MuralDetail from './pages/MuralDetail';
import ControlAuth from './pages/ControlAuth';
import ProjectionView from './pages/ProjectionView';
import GlobalLayout from './GlobalLayout';
import LanguageSelector from "./components/LanguageSelector.jsx";

import { LanguageContext } from './LanguageContext';
import translations from './translations';


function App() {
    const userLang = (navigator.language || navigator.userLanguage).split('-')[0];
    const defaultLang = ['en', 'es', 'de'].includes(userLang) ? userLang : 'en';
    const [currentLang, setCurrentLang] = useState(defaultLang);
    return (
        <LanguageContext.Provider value={translations[currentLang]}>
            <BrowserRouter>
                <LanguageSelector
                    currentLang={currentLang}
                    setCurrentLang={setCurrentLang}
                />
                <Routes>
                    <Route element={<GlobalLayout />}>
                        <Route path="/" element={<ModeSelect />} />
                        <Route path="/visitor" element={<VisitorView />} />
                        <Route path="/control-auth" element={<ControlAuth />} />
                        <Route path="/control" element={<ControlView />} />
                        <Route path="/mural/:id" element={<MuralDetail />} />
                        <Route path="/projection" element={<ProjectionView />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </LanguageContext.Provider>
    );
}

export default App;

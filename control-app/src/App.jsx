import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModeSelect from './pages/ModeSelect';
import VisitorView from './pages/VisitorView';
import ControlView from './pages/ControlView';
import MuralDetail from './pages/MuralDetail';
import ControlAuth from './pages/ControlAuth';
import GlobalLayout from './GlobalLayout';


function App() {
    return (
        <Router>
            <Routes>
                <Route element={<GlobalLayout />}>
                    <Route path="/" element={<ModeSelect />} />
                    <Route path="/visitor" element={<VisitorView />} />
                    <Route path="/control-auth" element={<ControlAuth />} />
                    <Route path="/control" element={<ControlView />} />
                    <Route path="/mural/:id" element={<MuralDetail />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

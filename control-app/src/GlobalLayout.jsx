import { Outlet, useLocation } from 'react-router-dom';
import HomeButton from './components/HomeButton';

function GlobalLayout() {
    const location = useLocation();

    // No mostramos el botón en el root o en projection view
    const showHomeButton = location.pathname !== '/' && location.pathname !== '/projection';

    return (
        <div className="main-container">
            {showHomeButton && <HomeButton />}
            <Outlet />
        </div>
    );
}

export default GlobalLayout;

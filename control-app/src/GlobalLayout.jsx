import { Outlet, useLocation } from 'react-router-dom';
import HomeButton from './components/HomeButton';

function GlobalLayout() {
    const location = useLocation();

    // No mostramos el botón en el root
    const showHomeButton = location.pathname !== '/';

    return (
        <div>
            {showHomeButton && <HomeButton />}
            <br/>
            <Outlet />
        </div>
    );
}

export default GlobalLayout;

import { useNavigate } from 'react-router-dom';
import '../styles/HomeButton.css';

function HomeButton() {
    const navigate = useNavigate();
    const svgSize = 40;
    const color = '#33CC66';

    return (
        <div className="home-button" onClick={() => navigate('/')}>
            <svg width={svgSize} height={svgSize} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke={color} strokeWidth="3">
                    <circle cx="20" cy="20" r="10" />
                    <circle cx="20" cy="20" r="3" fill={color} />
                </g>
            </svg>
        </div>
    );
}

export default HomeButton;

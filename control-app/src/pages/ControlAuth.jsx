import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ControlAuth.css';
import { FaLock } from 'react-icons/fa';

function ControlAuth() {
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const correctAnswer = "lemwerder";

    const handleSubmit = (e) => {
        e.preventDefault();

        if (answer.trim().toLowerCase() === correctAnswer) {
            navigate('/control');
        } else {
            setError("Respuesta incorrecta. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="auth-container">
            <h1>Acceso al modo de control <FaLock /></h1>
            <p className="auth-riddle">¿En qué ciudad pintó Toxicómano "Mestizaje is not dead"?</p>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Escribe tu respuesta..."
                    className="auth-input"
                />
                <button type="submit" className="auth-button">Entrar</button>
            </form>
            {error && <p className="auth-error">{error}</p>}
        </div>
    );
}

export default ControlAuth;

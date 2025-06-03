import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../LanguageContext';
import '../styles/ControlAuth.css';
import { FaLock } from 'react-icons/fa';

function ControlAuth() {
    const t  = useTranslation();
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const correctAnswer = "lemwerder";

    const handleSubmit = (e) => {
        e.preventDefault();

        if (answer.trim().toLowerCase() === correctAnswer) {
            navigate('/control');
        } else {
            setError(t('error'));
        }
    };

    return (
        <div className="auth-container">
            <h1>{t.riddleTitle} <FaLock /></h1>
            <p className="auth-riddle">{t.riddleQuestion}</p>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder={t.inputPlaceholder}
                    className="auth-input"
                />
                <button type="submit" className="auth-button">{t.submit}</button>
            </form>
            {error && <p className="auth-error">{error}</p>}
        </div>
    );
}

export default ControlAuth;

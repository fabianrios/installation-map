import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../LanguageContext';
import '../styles/ControlAuth.css';
import { FaLock } from 'react-icons/fa';

function ControlAuth() {
    const t = useTranslation();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    // We store only the selected riddle index
    const [riddleIndex] = useState(() => Math.floor(Math.random() * 2));

    // Riddle definitions: only store the answers here
    const riddles = [
        {
            question: t.riddleGermany,
            answer: "lemwerder"
        },
        {
            question: t.riddleColombia,
            answer: "cali, la linterna"
        }
    ];

    // Recompute question every render based on current language
    const riddle = riddles[riddleIndex];

    const [answer, setAnswer] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${apiUrl}/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answer: answer.trim().toLowerCase() })
            });

            if (!res.ok) {
                setError(t.error);
                return;
            }

            const data = await res.json();
            localStorage.setItem('token', data.token);
            navigate('/control');
        } catch {
            setError(t.serverError);
        }
    };

    return (
        <div className="auth-container">
            <h1>{t.riddleTitle} <FaLock /></h1>
            <p className="auth-riddle">{riddle.question}</p>
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

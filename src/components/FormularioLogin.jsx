import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/FormularioLogin.css"; // Importar el archivo CSS

const FormularioLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ correo: "", password: "" });
    const [error, setError] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        const blockedUntil = localStorage.getItem("blockedUntil");
        if (blockedUntil && new Date().getTime() < blockedUntil) {
            setIsBlocked(true);
            const timeout = setTimeout(() => setIsBlocked(false), blockedUntil - new Date().getTime());
            return () => clearTimeout(timeout);
        }
    }, []);

    const handleChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isBlocked) {
            setError("Demasiados intentos fallidos. Inténtalo nuevamente en 3 minutos.");
            return;
        }

        if (!formData.correo || !formData.password) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        setError("");

        try {
            const response = await axios.post("http://localhost:3000/api/login", formData);

            if (response.data.success) {
                localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
                localStorage.removeItem("blockedUntil");
                setAttempts(0);
                navigate("/perfil");
            } else {
                handleFailedAttempt();
            }
        } catch (error) {
            handleFailedAttempt();
        }
    };

    const handleFailedAttempt = () => {
        setAttempts((prev) => {
            const newAttempts = prev + 1;
            if (newAttempts >= 3) {
                const blockedUntil = new Date().getTime() + 2 * 60 * 1000; // 3 minutos
                localStorage.setItem("blockedUntil", blockedUntil);
                setIsBlocked(true);
                setTimeout(() => setIsBlocked(false), 2 * 60 * 1000);
            }
            return newAttempts;
        });
        setError("Correo o contraseña incorrectos.");
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Iniciar Sesión</h2>
                {error && <div className="error">{error}</div>}

                <input
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className="input-field"
                    disabled={isBlocked}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                    disabled={isBlocked}
                />

                <button type="submit" className="btn-login" disabled={isBlocked}>Iniciar Sesión</button>
                
                <button 
                    type="button" 
                    className="forgot-password" 
                    onClick={() => navigate("/reset-password")}
                    disabled={isBlocked}
                >
                    ¿Olvidaste tu contraseña?
                </button>
            </form>

            <p className="register-text">
                ¿No tienes una cuenta? <button onClick={() => navigate("/register")} className="btn-register">Regístrate</button>
            </p>
        </div>
    );
};

export default FormularioLogin;

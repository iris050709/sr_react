import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/FormularioLogin.css";

const FormularioLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ correo: "", password: "" });
    const [error, setError] = useState("");
    const [isBlocked, setIsBlocked] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetCode, setResetCode] = useState("");
    const [showCodeInput, setShowCodeInput] = useState(false);

    const handleChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.correo || !formData.password) {
            setError("Todos los campos son obligatorios.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/api/login", formData);
            if (response.data.success) {
                localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
                navigate("/perfil");
            } else {
                setError("Correo o contraseña incorrectos.");
            }
        } catch (error) {
            setError("Error al conectar con el servidor.");
        }
    };

    const handleForgotPassword = async () => {
        try {
            await axios.post("http://localhost:3000/api/send-reset-code", { correo: resetEmail });
            setShowCodeInput(true);
        } catch (error) {
            setError("Error al enviar el código de recuperación.");
        }
    };

    return (
        <div className="login-container">
            {!showReset ? (
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
                    <button type="button" className="forgot-password" onClick={() => setShowReset(true)}>
                        ¿Olvidaste tu contraseña?
                    </button>
                    {/* Agregar la opción de registro */}
                    <div className="register-link">
                        <p>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
                    </div>
                </form>
            ) : !showCodeInput ? (
                <div className="reset-container">
                    <h2>Recuperar Contraseña</h2>
                    <input
                        type="email"
                        placeholder="Ingresa tu correo"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="input-field"
                    />
                    <button onClick={handleForgotPassword} className="btn-login">Enviar Código</button>
                </div>
            ) : (
                <div className="reset-container">
                    <h2>Ingresar Código</h2>
                    <input
                        type="text"
                        placeholder="Código de recuperación"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        className="input-field"
                    />
                    <button onClick={() => navigate("/reset-password", { state: { correo: resetEmail, codigo: resetCode } })} className="btn-login">
                        Verificar Código
                    </button>
                </div>
            )}
        </div>
    );
};

export default FormularioLogin;

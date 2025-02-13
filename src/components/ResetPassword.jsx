import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/ResetPassword.css"; // Agrega estilos si es necesario
//1234ABCd@9

const ResetPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ correo: "", nuevaPassword: "" });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.correo || !formData.nuevaPassword) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        setError("");
        setMessage("");

        try {
            const response = await axios.post("http://localhost:3000/api/update-password", formData);

            if (response.data.success) {
                setMessage("Contraseña restablecida con éxito. Ahora puedes iniciar sesión.");
                setTimeout(() => navigate("/"), 2000);
            } else {
                setError("No se pudo restablecer la contraseña. Verifica tu correo.");
            }
        } catch (error) {
            setError("Ocurrió un error. Inténtalo nuevamente.");
        }
    };

    return (
        <div className="reset-password-container">
            <form onSubmit={handleSubmit} className="reset-password-form">
                <h2>Restablecer Contraseña</h2>
                {error && <div className="error">{error}</div>}
                {message && <div className="message">{message}</div>}

                <input
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="password"
                    name="nuevaPassword"
                    placeholder="Nueva Contraseña"
                    value={formData.nuevaPassword}
                    onChange={handleChange}
                    className="input-field"
                />

                <button type="submit" className="btn-reset">Restablecer</button>
            </form>
        </div>
    );
};

export default ResetPassword;

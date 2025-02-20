import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { correo, codigo } = location.state || {};

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newPassword || !confirmPassword) {
            setError("Todos los campos son obligatorios.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/reset-password", {
                correo,
                codigo,
                nuevaPassword: newPassword
            });

            if (response.data.success) {
                setSuccess("Contraseña restablecida con éxito. Redirigiendo...");
                setTimeout(() => navigate("/"), 3000);
            } else {
                setError("El código es inválido o ha expirado.");
            }
        } catch (error) {
            setError("Error al restablecer la contraseña.");
        }
    };

    const handleCancel = () => {
        navigate("/"); 
    };

    return (
        <div className="reset-container">
            <h2>Restablecer Contraseña</h2>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field"
                />
                <button type="submit" className="btn-login">Restablecer</button>
                <button type="button" className="btn-cancel" onClick={handleCancel}>Cancelar</button>
            </form>
        </div>
    );
};

export default ResetPassword;

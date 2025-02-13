import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/FormularioRegistro.css";

const FormularioRegistro = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "", correo: "", password: "", rol: "Usuario", foto: null, fecha_nacimiento: "", sexo: "Masculino"
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        setFormData((prevState) => ({ ...prevState, foto: e.target.files[0] }));
    };

    const handleCancel = () => {
        navigate("/");
    };

    const isPasswordValid = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.correo || !formData.password || !formData.fecha_nacimiento || !formData.sexo || !formData.foto || !formData.rol) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (!isPasswordValid(formData.password)) {
            setError("La contraseña debe tener al menos 10 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.");
            return;
        }

        setError("");
        setSuccessMessage("");

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => formDataToSend.append(key, value));

        try {
            const response = await axios.post("http://localhost:3000/api/usuarios", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setSuccessMessage(response.data.message);
            setFormData({ nombre: "", correo: "", password: "", rol: "Usuario", foto: null, fecha_nacimiento: "", sexo: "Masculino" });
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            setError(error.response ? error.response.data.error : "Error al registrar usuario");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>
                {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-2">{error}</div>}
                {successMessage && <div className="bg-green-100 text-green-700 p-2 rounded mb-2">{successMessage}</div>}
                
                <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
                <input type="email" name="correo" placeholder="Correo" value={formData.correo} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
                <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
                <input type="file" name="foto" onChange={handleFileChange} className="w-full p-2 border rounded mb-2" />
                <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
                <select name="sexo" value={formData.sexo} onChange={handleChange} className="w-full p-2 border rounded mb-2">
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
                <select name="rol" value={formData.rol} onChange={handleChange} className="w-full p-2 border rounded mb-4">
                    <option value="Administrador">Administrador</option>
                    <option value="Usuario">Usuario</option>
                    <option value="Sistema">Sistema</option>
                </select>
                <div className="flex gap-2">
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Registrarse</button>
                    <button type="button" onClick={handleCancel} className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default FormularioRegistro;

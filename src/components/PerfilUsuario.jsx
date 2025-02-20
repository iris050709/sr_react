import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/PerfilUsuario.css";

const PerfilUsuario = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [imagenCargada, setImagenCargada] = useState(true);

    useEffect(() => {
        const datosUsuario = localStorage.getItem("usuario");
        if (datosUsuario) {
            try {
                const usuarioParseado = JSON.parse(datosUsuario);
                setUsuario(usuarioParseado);
            } catch (error) {
                console.error("Error al parsear usuario:", error);
                navigate("/");
            }
        } else {
            navigate("/");
        }
    }, [navigate]);

    if (!usuario) {
        return <p className="cargando">Cargando...</p>;
    }

    const imagenUrl = usuario.foto ? `http://localhost:3000/uploads/${usuario.foto}` : null;

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        navigate("/");
    };

    const renderProfileContent = () => {
        switch (usuario.rol) {
            case "Usuario":
                return (
                    <div>
                        <h1 className="nombre">Perfil de {usuario.nombre}</h1>
                        <p className="correo"><strong>Correo:</strong> {usuario.correo}</p>
                        <p className="sexo"><strong>Sexo:</strong> {usuario.sexo}</p>
                        <p className="fecha-nacimiento"><strong>Fecha de nacimiento:</strong> {usuario.fecha_nacimiento}</p>
                    </div>
                );
            case "Administrador":
                return (
                    <div>
                        <h1 className="nombre">Perfil de Administrador {usuario.nombre}</h1>
                        <p className="correo"><strong>Correo:</strong> {usuario.correo}</p>
                        <p className="tipo-rol"><strong>Rol:</strong> {usuario.rol}</p>
                        <button className="admin-action-btn">Administrar usuarios</button>
                        <button className="admin-action-btn">Ver estadísticas</button>
                    </div>
                );
            case "Sistema":
                return (
                    <div>
                        <h1 className="nombre">Perfil del Sistema</h1>
                        <p className="status"><strong>Estado del Sistema:</strong> Activo</p>
                        <p className="version"><strong>Versión:</strong> 1.0.0</p>
                        <p className="mantenimiento"><strong>En mantenimiento:</strong> No</p>
                    </div>
                );
            default:
                return <p className="error">Rol no reconocido</p>;
        }
    };

    return (
        <div className="perfil-usuario">
            <h2 className="rol">Rol: {usuario.rol}</h2>
            
            {imagenUrl && imagenCargada ? (
                <img
                    src={imagenUrl}
                    alt="Foto del usuario"
                    className="perfil-imagen"
                    onError={() => setImagenCargada(false)}
                />
            ) : (
                <p className="imagen-no-disponible">Imagen no disponible</p>
            )}

            {renderProfileContent()}

            <button onClick={handleLogout} className="boton-salir">
                Salir
            </button>
        </div>
    );
};

export default PerfilUsuario;

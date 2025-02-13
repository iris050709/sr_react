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
            
            <h1 className="nombre">Perfil de {usuario.nombre}</h1>
            <p className="correo"><strong>Correo:</strong> {usuario.correo}</p>
            <p className="sexo"><strong>Sexo:</strong> {usuario.sexo}</p>
            <p className="fecha-nacimiento"><strong>Fecha de nacimiento:</strong> {usuario.fecha_nacimiento}</p>
            
            <button 
                onClick={handleLogout} 
                className="boton-salir"
            >
                Salir
            </button>
        </div>
    );
};

export default PerfilUsuario;

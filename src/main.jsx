import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Página principal
import LoginPage from "./pages/LoginPage"; // Página de login
import RegisterPage from "./pages/RegisterPage"; // Página de registro
import PerfilPage from "./pages/PerfilPage"; // Página del perfil del usuario
import ResetPassword from "./components/ResetPassword";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} /> {/* Página de login */}
      <Route path="/register" element={<RegisterPage />} /> {/* Página de registro */}
      <Route path="/perfil" element={<PerfilPage />} /> {/* Página de perfil */}
      <Route path="/reset-password" element={<ResetPassword />} /> {/* Página de perfil */}
    </Routes>
  </BrowserRouter>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage"; 
import RegisterPage from "./pages/RegisterPage"; 
import PerfilPage from "./pages/PerfilPage";
import ResetPassword from "./components/ResetPassword";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} /> 
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/perfil" element={<PerfilPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  </BrowserRouter>
);

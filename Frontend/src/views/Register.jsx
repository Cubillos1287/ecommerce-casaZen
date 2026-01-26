import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validación: vacíos
    if (!email.trim() || !password.trim()) {
      return Swal.fire({
        title: "¡Campos vacíos!",
        text: "Email y contraseña son obligatorios",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }

    // ✅ Validación: contraseña mínima
    if (password.length < 6) {
      return Swal.fire({
        title: "¡Contraseña débil!",
        text: "La contraseña debe tener al menos 6 caracteres.",
        icon: "warning",
        confirmButtonText: "Entendido",
      });
    }

    const result = await register(email, password, name ); 

    if (result) {
      Swal.fire({
        title: "Cuenta creada",
        text: "Registro exitoso",
        icon: "success",
        confirmButtonText: "Continuar",
      }).then(() => navigate("/profile"));
    } else {
      Swal.fire({
        title: "Error",
        text: "Error al registrarse (email duplicado o datos inválidos)",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <main className="register-page">
      <div className="register-card">
        {/* Panel Izquierdo (Formulario) */}
        <div className="register-left">
          <div className="auth-title">
            <h2>Crear Cuenta</h2>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              className="auth-input"
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="auth-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="auth-input"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="auth-btn" type="submit">
              Crear Cuenta
            </button>
          </form>
        </div>

        {/* Panel Derecho (Imagen) */}
        <div className="register-right" aria-hidden="true">
          <div className="auth-right-img" />
          <div className="auth-slogan">
            Espacios<br />simples,<br />vida<br />simple.
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;

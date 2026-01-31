import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1️⃣ Campos vacíos
    if (!email.trim() || !password.trim()) {
      return Swal.fire({
        title: "¡Campos vacíos!",
        text: "Todos los campos son obligatorios",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }

    // 2️⃣ Validar formato de Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Swal.fire({
        title: "¡Email inválido!",
        text: "Por favor ingresa un correo electrónico válido.",
        icon: "warning",
        confirmButtonText: "Corregir",
      });
    }

    // 2️⃣ Password corto
    if (password.length < 6) {
      return Swal.fire({
        title: "¡Contraseña débil!",
        text: "La contraseña debe tener al menos 6 caracteres.",
        icon: "warning",
        confirmButtonText: "Entendido",
      });
    }

    // 3️⃣ Intentar login
    const user = await login(email, password);

    // 4️⃣ Resultado
    if (user) {
      Swal.fire({
        title: "¡Bienvenida!",
        text: "Inicio de sesión exitoso",
        icon: "success",
        confirmButtonText: "Continuar",
      }).then(() => {
        navigate("/profile");
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Email o contraseña incorrectos",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <>
      <main className="auth-page">
        <div className="auth-card">
          {/* Panel Izquierdo */}
          <div className="auth-left">
            <div className="auth-title">
              <h2>Iniciar Sesión</h2>

              <form className="auth-form" onSubmit={handleSubmit}>
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
                  Ingresar
                </button>
              </form>
            </div>
          </div>

          {/* Panel Derecho */}
          <div className="auth-right" aria-hidden="true">
            <div className="auth-right-img" />
            <div className="auth-slogan">
              Espacios<br />simples,<br />vida<br />simple.
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;

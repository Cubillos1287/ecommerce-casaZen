import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
    // Usamos el hook useContext para acceder a la función 'login' del UserContext
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    // Estados locales para manejar los inputs del formulario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result) navigate("/profile");
        else alert("Error al iniciar sesión");
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

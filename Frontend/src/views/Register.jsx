import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { register } = useContext(UserContext);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Pasa nombre al register (mock)
        const result = await register(email, password, name);
        if (result) {
            navigate("/profile");
        } else {
            alert("Error al registrarse");
        }
    };

    return (
        <>

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
                                required
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
                            <button className="auth-btn" type="submit">Crear Cuenta</button>
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
        </>
    );
};
export default Register;

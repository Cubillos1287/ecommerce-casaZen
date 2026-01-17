import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result) {
            navigate("/profile");
        } else {
            alert("Error al iniciar sesión");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-left">
                    <div className="auth-title">
                        <h2>Iniciar Sesión</h2>
                        <form onSubmit={handleSubmit}>

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
                            <button className="auth-btn" type="submit">Ingresar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;

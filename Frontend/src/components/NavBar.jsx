import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const NavBar = () => {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <nav className="navBar">
            <div className="nav-left">
                <button className="logo" onClick={() => navigate('/')}>CasaZen</button>
            </div>

            <div className="nav-right">
                <Link to="/login"><button className="nav-btn">Iniciar Sesión</button></Link>
                <Link to="/register"><button className="nav-btn">Crear Cuenta</button></Link>
                <Link to="/profile"><button className="nav-btn">Perfil</button></Link>
                <Link to="/cart"><button className="nav-btn">Carrito</button></Link>
                <button className="nav-btn" onClick={() => { logout(); navigate('/login'); }}>Cerrar Sesión</button>
            </div>
        </nav>
    );
};

export default NavBar;

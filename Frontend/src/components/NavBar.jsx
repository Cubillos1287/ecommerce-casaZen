import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navBar">
            <div className="nav-left">
                <button className="logo" onClick={() => navigate('/')}>CasaZen</button>
            </div>

            <div className="nav-right">
                <Link to="/login"><button className="nav-btn">Iniciar Sesión</button></Link>
                <Link to="/signup"><button className="nav-btn">Crear Cuenta</button></Link>
                <Link to="/profile"><button className="nav-btn">Perfil</button></Link>
                <Link to="/cart"><button className="nav-btn">Carrito</button></Link>
                <button className="nav-btn" onClick={() => { /* TODO: conectar logout desde context */ }}>Cerrar Sesión</button>
            </div>
        </nav>
    );
};

export default NavBar;

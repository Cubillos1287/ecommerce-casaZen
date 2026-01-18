import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { isLogged, isAdmin, logout } = useContext(UserContext);

  return (
    <nav className="navBar">
      <div className="nav-left">
        <Link to="/" className="navLogo">CasaZen</Link>
      </div>

      <div className="nav-right">
        {!isLogged && (
          <>
            <Link to="/login" className="nav">Iniciar Sesión</Link>
            <Link to="/register" className="nav">Crear Cuenta</Link>
          </>
        )}

        {isLogged && (
          <>
            {isAdmin && (
              <Link to="/mis-publicaciones" className="nav">Mis publicaciones</Link>
            )}
            <Link to="/profile" className="nav">Perfil</Link>
            <Link to="/cart" className="nav">Carrito</Link>

            <button type="button" className="nav logout-btn" onClick={logout}>
              Cerrar Sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
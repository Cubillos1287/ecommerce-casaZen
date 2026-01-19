import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { isLogged, isAdmin, logout } = useContext(UserContext);

  return (
    <header className="site-header">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <Link to="/" className="brand-logo">
            <h1>CasaZen</h1>
          </Link>

          <div className="top-bar-actions">
            {!isLogged ? (
              <>
                <Link to="/login" className="auth-link">Iniciar Sesion</Link>
                <Link to="/register" className="auth-link">Crear cuenta</Link>
              </>
            ) : (
              <>
                {isAdmin && (
                  <Link to="/mis-publicaciones" className="auth-link">Mis publicaciones</Link>
                )}
                <Link to="/profile" className="auth-link">Perfil</Link>
                <button type="button" className="auth-link logout-btn-text" onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  Cerrar Sesión
                </button>
              </>
            )}

            {isLogged && (
              <div className="user-controls">
                {/* Logic for user controls if needed separately */}
              </div>
            )}

            <Link to="/cart" className="cart-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Nav Bar */}
      <div className="nav-bar">
        <nav className="container nav-links">
          <Link to="/cocina" className="nav-item">Cocina</Link>
          <Link to="/cuarto" className="nav-item">Cuartos</Link>
          <Link to="/baño" className="nav-item">Baño</Link>
          <Link to="/oficina" className="nav-item">Oficina</Link>
          <Link to="/decoracion" className="nav-item">Decoración de Hogar</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

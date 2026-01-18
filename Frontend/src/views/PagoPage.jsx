import { Link } from "react-router-dom";

const PagoPage = () => {

    return (
        <div className="container-pago">
            <div className="pago-page">
                <h3>¡Un paso más para completar tu compra!</h3>
                <p>Para continuar con tu compra, necesitas crear una cuenta o iniciar sesión. Esto nos permite
                    guardar tu información de forma segura y ofrecerte una mejor experiencia durante el proceso de compra.</p>
                <div className="auth-links">
                    <Link to="/login" className="login-btn-custom">Iniciar Sesion</Link>
                    <Link to="/register" className="register-btn-custom">Crear Cuenta</Link>
                </div>


            </div>
        </div>
    );
}
export default PagoPage;
import { Link } from "react-router-dom";

const ConfirmacionPage = () => {  

    return (
        <div className="container-pago">
        <div className="pago-page">
            <h3>¡Todo listo✅!</h3>
            <p>Recibirás un correo con el resumen de tu pedido.</p>
            <Link to="/" className="incio-btn">Volver al incio </Link>
            

        </div>
        </div>
    );
  }
export default ConfirmacionPage;
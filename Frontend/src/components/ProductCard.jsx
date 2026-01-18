import { Link } from "react-router-dom";

// Componente funcional que recibe Props desestructuradas
// Esto permite reutilizar la misma tarjeta con diferente información (nombre, img, precio)
const ProductCard = ({
  img,
  nombre,
  descripcion,
  precio,
  buttonText = "Comprar", // Valor por defecto si no se envía la prop
  buttonTo = "/pago",
  variant = "vertical" // Prop opcional para cambiar estilo
}) => {
  return (
    <div className={`card ${variant}`}>
      <img className="card-image" src={img} alt={nombre} />

      {/* Wrapper para el contenido de texto y botón */}
      <div className="card-content">
        <h3 className="card-nombre">{nombre}</h3>
        <p className="card-descripcion">{descripcion}</p>
        <p className="card-precio">${precio}</p>

        <Link to={buttonTo} className="btn-primary">
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

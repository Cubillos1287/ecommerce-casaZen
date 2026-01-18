import { Link } from "react-router-dom";

const ProductCard = ({
  img,
  nombre,
  descripcion,
  precio,
  buttonText = "Comprar",
  buttonTo = "/pago",
}) => {
  return (
    <div className="card">
      <img className="card-image" src={img} alt={nombre} />
      <h3 className="card-nombre">{nombre}</h3>
      <p className="card-descripcion">{descripcion}</p>
      <p className="card-precio">${precio}</p>

      <Link to={buttonTo} className="btn-primary">
        {buttonText}
      </Link>
    </div>
  );
};

export default ProductCard;

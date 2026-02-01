import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";

const ProductCard = ({
  id,
  img,
  nombre,
  descripcion,
  precio,
  buttonText = "Añadir",
  variant = "vertical"
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, nombre, precio, img });
  };

  return (
    <div className={`card ${variant}`}>
      <div className="card-image-container">
        <img className="card-image" src={img} alt={nombre} />
      </div>

      {/* Wrapper para el contenido de texto y botón */}
      <div className="card-content">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
          <h3 className="card-nombre" style={{ margin: 0, flex: 1, paddingRight: "10px" }}>{nombre}</h3>
        </div>
        <p className="card-descripcion">{descripcion}</p>
        <p className="card-precio">${precio}</p>

        <button className="btn-primary" onClick={handleAddToCart}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

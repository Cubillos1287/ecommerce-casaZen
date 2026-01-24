import { useCart } from "../context/CartContext";

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
    alert("Producto añadido al carrito!");
  };

  return (
    <div className={`card ${variant}`}>
      <img className="card-image" src={img} alt={nombre} />

      {/* Wrapper para el contenido de texto y botón */}
      <div className="card-content">
        <h3 className="card-nombre">{nombre}</h3>
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

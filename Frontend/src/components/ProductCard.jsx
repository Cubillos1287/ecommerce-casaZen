import { useCart } from "../context/CartContext";
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const ProductCard = ({
  id,
  img,
  nombre,
  descripcion,
  precio,
  buttonText = "Comprar",
  onFavoriteClick,
  isFavorite = false,
  variant = "vertical"
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, nombre, precio, img });

    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: "Se añadió al carrito correctamente",
      timer: 1500,
      showConfirmButton: false,
    });

  };

  return (
    <div className={`card ${variant}`}>
      <div className="img-wrapper">
        <img className="card-image" src={img} alt={nombre} />
        <button
          type="button"
          className="heart" onClick={() => onFavoriteClick?.(id, isFavorite)}
          style={{
            border: "none",
            cursor: "pointer"
          }}>
          <FontAwesomeIcon
            icon={isFavorite ? solidHeart : regularHeart}
            color={isFavorite ? "red" : "black"}
            size="lg"
          />
        </button>
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

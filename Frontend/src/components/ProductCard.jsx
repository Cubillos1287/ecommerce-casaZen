import { useCart } from "../context/CartContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
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
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({ id, nombre, precio, img });



  };

  return (
    <div className={`card ${variant}`}>
      <div className="img-wrapper">
        <img
          className="card-image"
          src={img ? img.replace(/^.*\/imgs\//, '/imgs/').replace(/^\/?src\/assets\/imgs\//, '/imgs/') : ''}
          alt={nombre}
        />
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
        {/* Botón de edición para admins con validación de rol o email */}
        {user && (user.rol === 'admin' || user.email === 'admin@casazen.com') && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // Evitar click en la card
              // Redirigir a editar, necesitamos useNavigate aqui o un Link, 
              // pero estamos dentro de map, mejor pasar navigate o usar window.location (menos SPA)
              // Usaremos un link oculto o mejor, un onClick handler pasado desde el padre o importando useNavigate
              // ProductCard no tiene useNavigate. Lo importaré.
              navigate(`/productos/editar/${id}`);
            }}
            className="heart"
            style={{
              right: "auto",
              left: "8px",
              top: variant === 'horizontal' ? '8px' : 'auto',
              bottom: variant === 'vertical' ? '4px' : 'auto'
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        )}
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

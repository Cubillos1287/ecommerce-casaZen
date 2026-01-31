import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { FavoritesContext } from "../context/FavoritesContext";

const FavoritosPage = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="favoritos-page">
      <h1>Mis Favoritos ❤️</h1>
      {favorites.length > 0 ? (
        <div className="category-grid">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              img={product.img}
              nombre={product.nombre}
              descripcion={product.descripcion}
              precio={product.precio}
              variant="horizontal"
            />
          ))}
        </div>
      ) : (
        <p>No tienes favoritos aún. ¡Ve a explorar más productos!</p>
      )}
    </div>
  );
};

export default FavoritosPage;
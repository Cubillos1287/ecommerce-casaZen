import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const FavoritosPage = () => {

  const navigate = useNavigate();

  const {products} = useContext(ProductContext);
  const {token , 
    favoriteIds = new Set(), 
    addFavorite ,
    removeFavorite
    } = useContext(UserContext);

  const favoriteProducts = (products || []).filter((p) =>
    favoriteIds.has(String(p.id)) 
);

  const handleFavoriteClick = async (productId, isFavorite) => {
    if (!token) {
      navigate("/acceso");
      return;
    }

    if (isFavorite) await removeFavorite(productId);
    else await addFavorite(productId);
  };


  return (
    <div className="favoritos-page">
      <h1>Mis Favoritos</h1>
      {favoriteProducts.length > 0 ? (
        <div className="products-grid">
          {favoriteProducts.map((product) => (
            <ProductCard 
            key={product.id}
              id={product.id}
              img={product.img}
              nombre={product.nombre}
              descripcion={product.descripcion}
              precio={product.precio}
              isFavorite={true}
              onFavoriteClick={handleFavoriteClick}
              variant="vertical" 
            />
          ))}
        </div>
      ) : (
        <p>No tienes favoritos aún.</p>
      )}
    </div>
  );
};

export default FavoritosPage;
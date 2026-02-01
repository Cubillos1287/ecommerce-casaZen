import React, { useContext, useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const { products } = useContext(ProductContext);


  const { token, favoriteIds, addFavorite, removeFavorite } = useContext(UserContext);

  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setDestacados([...products].sort(() => Math.random() - 0.5));
    }
  }, [products]);

  const isFav = (id) => {
    if (!favoriteIds) return false;
    if (favoriteIds instanceof Set) return favoriteIds.has(String(id)) || favoriteIds.has(Number(id));
    return favoriteIds.includes(String(id)) || favoriteIds.includes(Number(id));
  };

  const handleFavoriteClick = async (productId, isFavorite) => {
    if (!token) {
      navigate("/acceso");
      return;
    }

    if (isFavorite) {
      await removeFavorite(productId);
    } else {
      await addFavorite(productId);
    }
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h2>Espacios simples, vida simple.</h2>
        </div>
      </div>

      <div className="products-container products-grid">
        {destacados.slice(0, 20).map((producto) => (
          <ProductCard
            key={producto.id}
            id={producto.id}
            img={producto.img}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            precio={producto.precio}
            isFavorite={isFav(producto.id)}             
            onFavoriteClick={handleFavoriteClick}       
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;

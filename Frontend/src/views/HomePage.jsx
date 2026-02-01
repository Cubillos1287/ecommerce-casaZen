import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


function HomePage() {

  const navigate = useNavigate();
  const {token} = useContext(UserContext);

  const handleFavoriteClick = (productId, isFavorite) => {
    if (!token) {
      navigate("/acceso");
      return;
    }

    console.log("Favorito click:", productId, "isFavorite:", isFavorite)
  }
  const { products } = useContext(ProductContext);
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const shuffled = [...products].sort(() => Math.random() - 0.5);
      setDestacados(shuffled);
    }
  }, [products]);
  console.log("products:", products);


  return (
    <div className="home-page">

      <div className="hero-section">
        <div className="hero-content">
          <h2>Espacios simples, vida simple.</h2>
        </div>
      </div>

      <div className="products-container">
        {destacados.slice(0, 20).map((producto) => (
          <ProductCard
            key={producto.id}
            id={producto.id}
            img={producto.img}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            precio={producto.precio}
            isFavorite={false}
            onFavoriteClick={handleFavoriteClick}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;


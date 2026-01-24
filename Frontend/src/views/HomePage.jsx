import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";

function HomePage() {
  const { products } = useContext(ProductContext);
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setDestacados([...products].sort(() => Math.random() - 0.5));
    }
  }, [products]);

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
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;


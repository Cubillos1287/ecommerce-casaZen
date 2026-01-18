import React from "react";
import ProductCard from "../components/ProductCard";
import { productos } from "../data/products";
import { useState, useEffect } from "react";

function HomePage() {
  // Estado local para guardar los productos destacados
  const [destacados, setDestacados] = useState([]);

  // Hook useEffect: Se ejecuta una vez al montar el componente (con el array vacío [])
  // Aquí simulamos cargar los productos y desordenarlos aleatoriamente
  useEffect(() => {
    setDestacados([...productos].sort(() => Math.random() - 0.5));
  }, []);

  return (
    <div className="home-page">

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h2>Espacios simples, vida simple.</h2>
        </div>
      </div>

      <div className="products-container">
        {destacados.slice(0, 20).map((producto) => (
          <ProductCard
            key={producto.id}
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


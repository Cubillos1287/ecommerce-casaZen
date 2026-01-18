import React from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { productos } from "../data/products";
import { useState } from "react";

function HomePage() {
  const [destacados] = useState(() => {
    return [...productos].sort(() => Math.random() - 0.5);
  });

  return (
    <div>
      <Header />

      <div className="product-card">

        {destacados.slice(0, 20).map((producto) => (

          <ProductCard
            key={producto.id}
            img={producto.img}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            precio={producto.precio}
          />
        ))
        }

      </div>
    </div>
  )
};








export default HomePage;


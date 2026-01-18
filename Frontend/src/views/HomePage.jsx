import React from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { productos } from "../data/products";
import { useEffect,useState } from "react";

function HomePage(){
  const [destacados, setDestacados] = useState([]); // Estado para almacenar los productos destacados
  useEffect(()=> {
    const destacadosProductos = [...productos].sort(() => Math.random() - 0.5); // Mezcla aleatoriamente los productos
    setDestacados(destacadosProductos);
} , []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente
  
    return (
        <div>
          <Header />

          <div className="product-card">
          
            {destacados.slice(0,20).map((producto) => (
          
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


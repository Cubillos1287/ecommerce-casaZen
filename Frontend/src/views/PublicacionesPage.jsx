import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { productos } from "../data/products";

function PublicacionesPage() {
  // Estado local para guardar las publicaciones
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    // Desordenar aleatoriamente las publicaciones al cargar la página
    setPublicaciones([...productos].sort(() => Math.random() - 0.5));
  }, []);

  return (
    <div className="product-card">
      {publicaciones.slice(0, 8).map((producto) => (

        <ProductCard
          key={producto.id}
          img={producto.img}
          nombre={producto.nombre}
          descripcion={producto.descripcion}
          precio={producto.precio}
          buttonText="Editar publicación"
          buttonTo="/mis-publicaciones"
        />
      ))}
    </div>
  );
}

export default PublicacionesPage;

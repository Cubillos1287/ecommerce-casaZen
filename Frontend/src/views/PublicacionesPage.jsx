import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { productos } from "../data/products";

function PublicacionesPage() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const misPublicaciones = [...productos].sort(() => Math.random() - 0.5);
    setPublicaciones(misPublicaciones);
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

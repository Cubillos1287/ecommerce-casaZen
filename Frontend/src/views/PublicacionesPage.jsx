import { useState, useEffect, useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";
import Swal from "sweetalert2";

function PublicacionesPage() {
  const { products, getProducts } = useContext(ProductContext);
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    // Si no hay productos cargados, los pedimos (aunque el context ya debería tenerlos)
    getProducts();
  }, []);

  useEffect(() => {
    if (products && products.length > 0) {
      // Desordenar aleatoriamente una copia para no afectar el estado global
      const shuffled = [...products].sort(() => Math.random() - 0.5);
      setPublicaciones(shuffled);
    }
  }, [products]);

  return (
    <div className="product-card">
      {publicaciones.length === 0 ? (
        <p style={{ textAlign: "center", width: "100%", padding: "20px" }}>Cargando publicaciones...</p>
      ) : (
        publicaciones.slice(0, 8).map((producto) => (
          <ProductCard
            key={producto.id}
            id={producto.id}
            img={producto.img}
            nombre={producto.nombre}
            descripcion={producto.descripcion || ""}
            precio={producto.precio}
            buttonText="Ver detalle"
            buttonTo={`/productos/${producto.id}`} // O ajustar a donde deba ir
          />
        ))
      )}
    </div>
  );
}

export default PublicacionesPage;

import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Swal from "sweetalert2";

function PublicacionesPage() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/productos");
        if (res.ok) {
          const data = await res.json();
          // Desordenar aleatoriamente
          setPublicaciones(data.sort(() => Math.random() - 0.5));
        } else {
          console.error("Error al obtener productos");
          Swal.fire("Error", "No se pudieron cargar las publicaciones", "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Error de conexión", "error");
      }
    };

    fetchProductos();
  }, []);

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

import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";

const OficinaPage = () => {
    const { products } = useContext(ProductContext);
    const oficinaProductos = products.filter((producto) => producto.categoria === "oficina");

    return (
        <div className="category-grid">
            {oficinaProductos.map((producto) => (
                <ProductCard
                    key={producto.id}
                    id={producto.id}
                    img={producto.img}
                    nombre={producto.nombre}
                    descripcion={producto.descripcion}
                    variant="horizontal"
                    precio={producto.precio}
                />
            ))}
        </div>
    );
}
export default OficinaPage;
import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";

const DecoracionPage = () => {
    const { products } = useContext(ProductContext);
    const decoracionProductos = products.filter((producto) => producto.categoria === "decoracion");

    return (
        <div className="category-grid">
            {decoracionProductos.map((producto) => (
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
export default DecoracionPage;
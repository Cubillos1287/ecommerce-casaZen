import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";

const BanioPage = () => {
    const { products } = useContext(ProductContext);
    const bañoProductos = products.filter((producto) => producto.categoria === "baño");

    return (
        <div className="category-grid">
            {bañoProductos.map((producto) => (
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
export default BanioPage;

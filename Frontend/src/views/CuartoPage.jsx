import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";

const CuartoPage = () => {
    const { products } = useContext(ProductContext);
    const cuartoProductos = products.filter((producto) => producto.categoria === "cuarto");

    return (
        <div className="category-grid">
            {cuartoProductos.map((producto) => (
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
export default CuartoPage;
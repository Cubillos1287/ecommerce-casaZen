import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";

const CocinaPage = () => {
    const { products } = useContext(ProductContext);

    // Filtramos usando la propiedad 'category' que viene de la BD
    const cocinaProductos = products.filter((producto) => producto.category === "cocina");

    return (
        <div className="category-grid">
            {cocinaProductos.map((producto) => (
                <ProductCard
                    key={producto.id}
                    img={producto.img}
                    nombre={producto.nombre} // Backend: name -> nombre
                    descripcion={producto.descripcion} // Backend: description -> descripcion
                    variant="horizontal"
                    precio={producto.precio} // Backend: price -> precio
                />
            ))}
        </div>
    );
}
export default CocinaPage;
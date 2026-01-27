import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const DecoracionPage = () => {
    const navigate = useNavigate();

    const { products } = useContext(ProductContext);
    const { token,
        favoriteIds = new Set(),
        addFavorite,
        removeFavorite
    } = useContext(UserContext);

    const decoracionProductos = products.filter((producto) => producto.categoria === "decoracion");

    const handleFavoriteClick = async (productId, isFavorite) => {
        if (!token) {
            navigate("/acceso");
            return;
        }

        if (isFavorite) await removeFavorite(productId);
        else await addFavorite(productId);
    };


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
                    isFavorite={favoriteIds.has(String(producto.id))}
                    onFavoriteClick={handleFavoriteClick}
                />
            ))}
        </div>
    );
}
export default DecoracionPage;
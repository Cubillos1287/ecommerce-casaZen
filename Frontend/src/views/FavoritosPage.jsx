import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";

const FavoritosPage = () => {
  const { products } = useContext(ProductContext);
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    const savedFavorites = localStorage.getItem("favoritos");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <div className="favoritos-page">
      <h1>Mis Favoritos</h1>
      {favoriteProducts.length > 0 ? (
        <div className="products-grid">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No tienes favoritos aún.</p>
      )}
    </div>
  );
};

export default FavoritosPage;
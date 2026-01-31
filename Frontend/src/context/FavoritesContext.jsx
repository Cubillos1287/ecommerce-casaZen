
import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import Swal from "sweetalert2";

export const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const { token } = useContext(UserContext);
    const [favorites, setFavorites] = useState([]);

    // Cargar favoritos al iniciarse o cambiar token
    useEffect(() => {
        if (token) {
            fetchFavorites();
        } else {
            setFavorites([]);
        }
    }, [token]);

    const fetchFavorites = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/favorites", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setFavorites(data);
            }
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    const addFavorite = async (product) => {
        if (!token) {
            Swal.fire({
                title: "Inicia Sesión",
                text: "Debes iniciar sesión para guardar favoritos",
                icon: "info",
                confirmButtonText: "Ir al Login"
            });
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/api/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ productId: product.id })
            });

            if (response.ok) {
                // Optimismo: agregamos localmente sin recargar todo
                // Pero como necesitamos datos completos, mejor hacemos fetch o append manual
                // fetchFavorites(); 
                // Mejor manual para rapidez visual:
                setFavorites(prev => [...prev, product]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const removeFavorite = async (productId) => {
        if (!token) return;
        try {
            const response = await fetch(`http://localhost:3000/api/favorites/${productId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                setFavorites(prev => prev.filter(p => p.id !== productId));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const isFavorite = (productId) => {
        return favorites.some(p => p.id === productId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

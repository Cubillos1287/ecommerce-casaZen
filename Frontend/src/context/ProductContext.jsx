import { createContext, useState, useEffect } from "react";

// 1. Cree el Contexto
// Este contexto servirá para compartir los productos que vienen del backend con toda la app
export const ProductContext = createContext();

// 2. Cree el Provider
export const ProductProvider = ({ children }) => {
    // Estado donde guardamos los productos obtenidos de la API
    const [products, setProducts] = useState([]);

    // useEffect se ejecuta al iniciar la app
    useEffect(() => {
        getProducts();
    }, []);

    // Función asíncrona para pedir los datos al servidor
    const getProducts = async () => {
        try {
            // Hago la petición GET al backend
            const response = await fetch("http://localhost:3000/productos");
            const data = await response.json();

            // Guardamos los datos en el estado
            setProducts(data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };

    return (
        // 3. Se Comparten los datos (products) con los componentes hijos
        <ProductContext.Provider value={{ products }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;

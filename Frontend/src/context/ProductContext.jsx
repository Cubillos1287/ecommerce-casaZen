import { createContext, useEffect, useState } from "react";

//  Creamos el contexto
export const ProductContext = createContext();

// Creamos el Provider
export const ProductProvider = ({ children }) => {
  // Estado donde guardamos los productos
  const [products, setProducts] = useState([]);

  //  Se ejecuta al cargar la app
  useEffect(() => {
    getProducts();
  }, []);

  // Función que pide los productos al backend
  const getProducts = async () => {
    try {
      // OJO: La ruta en backend es /api/productos, no /productos
      const response = await fetch("http://localhost:3000/api/productos");
      const data = await response.json();

      console.log("DATA /api/productos:", data);
      setProducts(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  //  Compartimos los productos con toda la app
  return (
    <ProductContext.Provider value={{ products, getProducts }}>
      {children}
    </ProductContext.Provider>
  );
};


export default ProductProvider;

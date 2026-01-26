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
      const response = await fetch("http://localhost:3000/productos");
      const data = await response.json();

      //  Como el endpoint es público, data DEBE ser un array
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
    const response = await fetch("http://localhost:3000/productos");
const data = await response.json();
console.log("DATA /productos:", data);
setProducts(Array.isArray(data) ? data : (data.productos || data.products || []));

  };

  //  Compartimos los productos con toda la app
  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};


export default ProductProvider;

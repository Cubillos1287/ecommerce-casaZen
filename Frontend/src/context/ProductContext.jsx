import { createContext, useEffect, useState } from "react";

//  Creamos el contexto
export const ProductContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

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
      const response = await fetch(`${API_URL}/api/productos`);
      const data = await response.json();

      console.log("DATA /api/productos:", data);
      setProducts(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // Función para crear producto
  const createProduct = async (productData, token) => {
    try {
      const res = await fetch(`${API_URL}/api/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      if (res.ok) {
        await getProducts(); // Refrescar lista
        return { success: true };
      } else {
        const errorData = await res.json();
        return { success: false, message: errorData.message || "Error al crear producto" };
      }
    } catch (error) {
      console.error("Error createProduct:", error);
      return { success: false, message: "Error de conexión" };
    }
  };

  // Función para obtener un solo producto
  const getProductById = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/productos/${id}`);
      if (res.ok) {
        const data = await res.json();
        return { success: true, product: data };
      } else {
        return { success: false, message: "Error al obtener el producto" };
      }
    } catch (error) {
      console.error("Error getProductById:", error);
      return { success: false, message: "Error de conexión" };
    }
  };

  // Función para actualizar producto
  const updateProduct = async (id, productData, token) => {
    try {
      const res = await fetch(`${API_URL}/api/productos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      if (res.ok) {
        await getProducts(); // Refrescar lista
        return { success: true };
      } else {
        const errorData = await res.json();
        return { success: false, message: errorData.message || "Error al actualizar producto" };
      }
    } catch (error) {
      console.error("Error updateProduct:", error);
      return { success: false, message: "Error de conexión" };
    }
  };

  //  Compartimos los productos con toda la app
  return (
    <ProductContext.Provider value={{ products, getProducts, createProduct, updateProduct, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};


export default ProductProvider;

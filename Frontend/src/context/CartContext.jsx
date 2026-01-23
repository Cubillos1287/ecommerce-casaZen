import { createContext, useState, useContext } from "react";

// 1. Crear el Contexto
export const CartContext = createContext();

// Hook personalizado para usar el carrito fácilmente
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe ser usado dentro de un CartProvider");
    }
    return context;
};

// 2. Crear el Provider
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Funciones del Carrito

    // Agregar producto
    const addToCart = (product) => {
        // Verificar si ya existe en el carrito
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            // Si existe, aumentamos la cantidad
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            // Si no existe, lo agregamos con cantidad 1
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    // Eliminar producto
    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    // Disminuir cantidad
    const decreaseQuantity = (id) => {
        const existingProduct = cart.find(item => item.id === id);

        if (existingProduct.quantity === 1) {
            // Si es 1, lo eliminamos
            removeFromCart(id);
        } else {
            // Si es mayor a 1, restamos
            setCart(cart.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ));
        }
    };

    // Calcular total
    const total = cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            decreaseQuantity,
            total,
            totalItems
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

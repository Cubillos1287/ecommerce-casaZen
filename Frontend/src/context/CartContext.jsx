import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; 

export const CartContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe ser usado dentro de un CartProvider");
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { token, user } = useContext(UserContext);

    // Cargar carrito desde Backend
    useEffect(() => {
        if (token) {
            fetchCart();
        } else {
            setCart([]); // Limpiar si no hay token
        }
    }, [token]);

    const fetchCart = async () => {
        try {
            const response = await fetch(`${API_URL}/api/carrito`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                // El backend devuelve { id, user_id, cartItems: [...] }
                // Mapeamos para que 'cart' sea el array de items
                setCart(data.cartItems || []);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    // Agregar producto (Integration API)
    const addToCart = async (product) => {
        if (!token) {
            Swal.fire({
                title: "Inicia Sesión",
                text: "Debes iniciar sesión para agregar al carrito",
                icon: "info",
                confirmButtonText: "Ir al Login",
            }).then(() => navigate("/login"));
            return;
        }

        try {
            // Necesitamos el cartId. Si no lo tenemos en el estado, lo obtenemos de fetchCart o asumimos
            // Pero el endpoint 'agregar' pide 'cartId' según el controller.
            // Espera, el controller 'agregarProductoAlCarrito' pide { cartId, productId }.
            // Pero el cliente no siempre sabe su cartId si no lo guardamos.
            // 'obtenerCarritoUsuario' nos da el ID del carrito.

            // HACK: Primero obtenemos el carrito para asegurar que tenemos el ID
            // Alternativa mejor: El backend debería inferir cartId del usuario, pero el controller actual lee req.body.cartId
            // Vamos a obtener el cartId del estado si lo tuvieramos, o hacer fetch primero.
            // Por simplicidad para este paso, haré que fetchCart guarde el cartId en un estado separado o lo buscamos.

            // Vamos a hacer una llamada a obtenerCarrito primero si está vacío?
            // No, mejor MODIFICAMOS fetch para guardar el cartId.
            // Pero para hacerlo rápido sin cambiar todo el estado 'cart' (que es array), usaré una variable auxiliar o haré fetch dentro.

            const cartRes = await fetch(`${API_URL}/api/carrito`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const cartData = await cartRes.json();
            const cartId = cartData.id;

            const response = await fetch(`${API_URL}/api/carrito/agregar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    cartId: cartId,
                    productId: product.id
                })
            });

            if (response.ok) {
                fetchCart(); // Recargar carrito
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Producto añadido al carrito",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });
            } else {
                const errorData = await response.json();
                Swal.fire({
                    title: "Error",
                    text: errorData.message || "Error al agregar",
                    icon: "error"
                });
            }

        } catch (error) {
            console.error("Error addToCart:", error);
        }
    };

    // Eliminar producto (DELETE /:id)
    const removeFromCart = async (productId) => {
        if (!token) return;
        try {
            // Necesitamos cartId para algunos endpoints, pero el endpoint DELETE que creamos usa params productId y body cartId
            // Mi endpoint nuevo: const { cartId } = req.body; const { productId } = req.params;
            // Qué molestia pedir cartId en body para un delete param.
            // Lo haré igual.

            const cartRes = await fetch(`${API_URL}/api/carrito`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const cartData = await cartRes.json();
            const cartId = cartData.id;

            const response = await fetch(`${API_URL}/api/carrito/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ cartId })
            });

            if (response.ok) {
                fetchCart();
            }

        } catch (error) {
            console.error(error);
        }
    };

    // Disminuir cantidad (PUT /eliminar)
    const decreaseQuantity = async (productId) => {
        if (!token) return;
        try {
            const cartRes = await fetch(`${API_URL}/api/carrito`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const cartData = await cartRes.json();
            const cartId = cartData.id;

            const response = await fetch(`${API_URL}/api/carrito/eliminar`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    cartId: cartId,
                    productId: productId
                })
            });

            if (response.ok) {
                fetchCart();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const checkout = async () => {
        if (!token) return;
        try {
            const cartRes = await fetch(`${API_URL}/api/carrito`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const cartData = await cartRes.json();
            const cartId = cartData.id;

            const response = await fetch(`${API_URL}/api/carrito/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ cartId })
            });

            if (response.ok) {
                setCart([]); // Vaciar localmente
                Swal.fire({
                    title: "¡Compra Exitosa!",
                    text: "Tu pedido ha sido procesado correctamente.",
                    icon: "success",
                    confirmButtonText: "Genial"
                });
            } else {
                const data = await response.json();
                Swal.fire({
                    title: "Error en la compra",
                    text: data.message || "No se pudo procesar la compra",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Error checkout:", error);
        }
    };

    const total = cart.reduce((acc, item) => acc + (item.product.precio * item.quantity), 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            decreaseQuantity,
            checkout,
            total,
            totalItems
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

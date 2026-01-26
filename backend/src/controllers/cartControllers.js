
import { actualizarStock } from '../../database/product.js';

import { obtenerCarrito, obtenerItemsDelCarrito, crearCarrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, editarCantidad } from '../../database/cart.js';



export const obtenerCarritoUsuario = async (req, res) => {
    try {
        const carritoResult = await obtenerCarrito(req.params.userId);
        let carrito;

        if (carritoResult.length === 0) {
            carrito = await crearCarrito(req.params.userId);
        } else {
            carrito = carritoResult[0];
        }

        const items = await obtenerItemsDelCarrito(carrito.id);

        const response = {
            id: carrito.id,
            user_id: carrito.user_id,
            cartItems: items.map(item => {
                if (!item.product_id) return null;
                return {
                    id: item.item_id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    product: {
                        id: item.product_id,
                        nombre: item.nombre,
                        descripcion: item.descripcion,
                        stock: item.stock,
                        categoria: item.categoria,
                        precio: item.precio,
                        img: item.img
                    }
                };
            }).filter(item => item !== null)
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el carrito" });
    }
}

export const agregarProductoAlCarrito = async (req, res) => {
    const { cartId, productId } = req.body;
    try {
        const items = await obtenerItemsDelCarrito(cartId);
        const item = items.find(item => item.product_id === productId);
        if (item) {
            await editarCantidad(cartId, productId, item.quantity + 1);
        } else {
            await agregarAlCarrito(cartId, productId, 1);
        }
        res.status(200).json({ message: "Producto agregado al carrito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al agregar el producto al carrito" });
    }
}

export const eliminarProductoDelCarrito = async (req, res) => {
    const { cartId, productId } = req.body;
    try {
        const items = await obtenerItemsDelCarrito(cartId);
        const item = items.find(item => item.product_id === productId);
        if (item.quantity > 1) {
            await editarCantidad(cartId, productId, item.quantity - 1);
        } else {
            await eliminarDelCarrito(cartId, productId);
        }
        res.status(200).json({ message: "Producto eliminado del carrito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el producto del carrito" });
    }
}

export const eliminarTodoDelCarrito = async (req, res) => {
    const { cartId } = req.body;
    try {
        await vaciarCarrito(cartId);
        res.status(200).json({ message: "Todo eliminado del carrito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar todo del carrito" });
    }
}


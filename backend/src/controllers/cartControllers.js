
import { actualizarStock, obtenerProductoPorId } from '../../database/product.js';

import { obtenerCarrito, obtenerItemsDelCarrito, crearCarrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, editarCantidad } from '../../database/cart.js';



export const obtenerCarritoUsuario = async (req, res) => {
    try {
        const userId = req.user.id;
        const carritoResult = await obtenerCarrito(userId);
        let carrito;

        if (carritoResult.length === 0) {
            carrito = await crearCarrito(userId);
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
        const product = await obtenerProductoPorId(productId);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        const items = await obtenerItemsDelCarrito(cartId);
        const item = items.find(item => item.product_id === productId);

        if (item) {
            if (item.quantity + 1 > product.stock) {
                return res.status(400).json({ message: "No hay suficiente stock disponible" });
            }
            await editarCantidad(cartId, productId, item.quantity + 1);
        } else {
            if (product.stock < 1) {
                return res.status(400).json({ message: "No hay stock disponible" });
            }
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

export const eliminarItemCompletamente = async (req, res) => {
    const { cartId } = req.body;
    const { productId } = req.params;
    try {
        await eliminarDelCarrito(cartId, productId);
        res.status(200).json({ message: "Producto eliminado del carrito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el producto" });
    }
}

export const checkout = async (req, res) => {
    const { cartId } = req.body;
    try {
        const items = await obtenerItemsDelCarrito(cartId);

        if (items.length === 0) {
            return res.status(400).json({ message: "El carrito está vacío" });
        }

        // 1. Validar Stock de TODO primero
        for (const item of items) {
            const product = await obtenerProductoPorId(item.product_id);
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `No hay suficiente stock para: ${product.nombre}` });
            }
        }

        // 2. Procesar Compra (Restar Stock)
        for (const item of items) {
            await actualizarStock(item.product_id, item.quantity);
        }

        // 3. Vaciar Carrito
        await vaciarCarrito(cartId);

        res.status(200).json({ message: "Compra realizada con éxito" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al procesar la compra" });
    }
}


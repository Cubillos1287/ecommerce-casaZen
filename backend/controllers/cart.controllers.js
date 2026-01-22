import { actualizarStock } from '../db/product.js';

export const procesarCompra = async (req, res) => {
    const carrito = req.body;

    try {
        if (!Array.isArray(carrito)) {
            return res.status(400).send("El carrito debe ser una lista de productos");
        }

        // Recorremos el carrito y actualizamos el stock uno por uno
        for (const producto of carrito) {
            // producto.id es el ID, producto.quantity es la cantidad a comprar
            await actualizarStock(producto.id, producto.quantity);
        }

        res.status(200).json({ message: "Compra realizada con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al procesar la compra" });
    }
}

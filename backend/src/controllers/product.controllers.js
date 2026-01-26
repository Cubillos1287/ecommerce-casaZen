import { obtenerProductos } from "../../database/product.js";



export const leerProductosController = async (req, res) => {
    try {
        const productos = await obtenerProductos();
        res.json(productos);
    } catch (error) {
        console.error("Error leerProductos:", error);
        return res.status(500).json({ message: "Error al obtener los productos" });
    }
}

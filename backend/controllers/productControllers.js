import { obtenerProductos, obtenerProductoPorId, obtenerProductoPorCategoria } from '../db/product.js';


export const leerProductos = async (req, res) => {
    try {
        const productos = await obtenerProductos();
        res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos" });
    }
}

export const leerProductoPorCategoria = async (req, res) => {
    try {
        const producto = await obtenerProductoPorCategoria(req.params.categoria);
        res.json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el producto" });
    }
}
export const leerProductoPorId = async (req, res) => {
    try {
        const producto = await obtenerProductoPorId(req.params.id);
        res.json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el producto" });
    }
}


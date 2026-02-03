import {
    obtenerProductos,
    obtenerProductoPorId,
    obtenerProductoPorCategoria,
    agregarProducto as crearProductoModel,
    actualizaProducto as actualizarProductoModel,
    eliminarProducto as eliminarProductoModel,
    obtenerProductoEnCarrito
} from '../models/productModel.js';


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
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el producto" });
    }
}

export const agregarProducto = async (req, res) => {
    try {
        const { nombre, precio, stock, categoria, img, descripcion } = req.body;
        // Validación básica
        if (!nombre || !precio || !stock || !categoria) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const producto = await crearProductoModel(nombre, precio, stock, categoria, img, descripcion);
        res.status(201).json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al agregar el producto" });
    }
}

export const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock, categoria, img, descripcion } = req.body;

        const producto = await actualizarProductoModel(id, nombre, precio, stock, categoria, img, descripcion);
        console.log("Actualizando producto:", { id, nombre, precio, stock, categoria, img, descripcion });

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el producto" });
    }
}

export const borrarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Verificar si el producto está en algún carrito
        const productoEnUso = await obtenerProductoEnCarrito(id);
        if (productoEnUso) {
            return res.status(409).json({
                message: "No se puede eliminar, el producto está en un carrito activo de algún cliente."
            });
        }

        // 2. Si no está en uso, borrar
        const productoEliminado = await eliminarProductoModel(id);

        if (!productoEliminado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Producto eliminado correctamente", producto: productoEliminado });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el producto" });
    }
}

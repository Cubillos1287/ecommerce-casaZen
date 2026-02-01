
import pool from '../config/db.js';

export const agregarFavorito = async (req, res) => {
    // El usuario viene del middleware authMiddleware (req.user)
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ message: "Se requiere productId" });
    }

    try {
        const query = "INSERT INTO favorites (user_id, product_id) VALUES ($1, $2) ON CONFLICT DO NOTHING";
        await pool.query(query, [userId, productId]);
        res.status(201).json({ message: "Agregado a favoritos" });
    } catch (error) {
        console.error("Error al agregar favorito:", error);
        res.status(500).json({ message: "Error interno" });
    }
};

export const eliminarFavorito = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;

    try {
        const query = "DELETE FROM favorites WHERE user_id = $1 AND product_id = $2";
        await pool.query(query, [userId, productId]);
        res.status(200).json({ message: "Eliminado de favoritos" });
    } catch (error) {
        console.error("Error al eliminar favorito:", error);
        res.status(500).json({ message: "Error interno" });
    }
};

export const obtenerFavoritos = async (req, res) => {
    const userId = req.user.id;
    try {
        // Obtenemos los productos completos que están en favoritos
        const query = `
            SELECT p.* 
            FROM products p
            JOIN favorites f ON p.id = f.product_id
            WHERE f.user_id = $1
        `;
        const result = await pool.query(query, [userId]);
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener favoritos:", error);
        res.status(500).json({ message: "Error interno" });
    }
};

import { Router } from "express";
import {authMiddleware} from "../middleware/authMiddleware.js"
import pool from "../database/config.js"


const router = Router();

/**
 * GET /api/favorites
 * Trae los IDs de productos favoritos del usuario
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT product_id FROM favorites WHERE user_id = $1",
      [req.user.id]
    );

    res.json({
      productIds: rows.map((r) => r.product_id),
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener favoritos" });
  }
});

/**
 * POST /api/favorites
 * Agrega un producto a favoritos
 */
router.post("/", authMiddleware, async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "productId requerido" });
  }

  try {
    await pool.query(
      "INSERT INTO favorites (user_id, product_id) VALUES ($1, $2)",
      [req.user.id, productId]
    );

    res.status(201).json({ message: "Agregado a favoritos" });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Ya es favorito" });
    }
    res.status(500).json({ message: "Error al agregar favorito" });
  }
});

/**
 * DELETE /api/favorites/:productId
 * Elimina un producto de favoritos
 */
router.delete("/:productId", authMiddleware, async (req, res) => {
  const { productId } = req.params;

  try {
    await pool.query(
      "DELETE FROM favorites WHERE user_id = $1 AND product_id = $2",
      [req.user.id, productId]
    );

    res.json({ message: "Eliminado de favoritos" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar favorito" });
  }
});

export default router;


import { Router } from "express";
import { agregarFavorito, eliminarFavorito, obtenerFavoritos } from "../controllers/favoritesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// Todas las rutas requieren estar logueado
router.post("/", authMiddleware, agregarFavorito);
router.get("/", authMiddleware, obtenerFavoritos);
router.delete("/:productId", authMiddleware, eliminarFavorito);

export default router;

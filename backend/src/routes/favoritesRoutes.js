import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { listFavoritesControler, createFavoriteControler, removeFavoriteControler } from "../controllers/FavoriteControllers.js";

const router = Router();

router.get("/", authMiddleware, listFavoritesControler);
router.post("/", authMiddleware, createFavoriteControler);
router.delete("/:productId", authMiddleware, removeFavoriteControler);

export default router;


import { Router } from 'express';
import { leerProductos, leerProductoPorCategoria, leerProductoPorId } from '../src/controllers/productControllers.js';
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = Router();

router.get('/', authMiddleware, leerProductos);
router.get('/categoria/:categoria', authMiddleware, leerProductoPorCategoria);
router.get('/:id', authMiddleware, leerProductoPorId);


export default router;

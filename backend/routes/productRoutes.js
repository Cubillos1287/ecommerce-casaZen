import { Router } from 'express';
import { leerProductos, leerProductoPorCategoria, leerProductoPorId } from '../src/controllers/productControllers.js';
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = Router();

router.get('/', leerProductos);
router.get('/categoria/:categoria',leerProductoPorCategoria);
router.get('/:id', leerProductoPorId);


export default router;

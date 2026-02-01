import { Router } from 'express';
import { leerProductos, leerProductoPorCategoria, leerProductoPorId, agregarProducto, actualizarProducto } from '../controllers/productControllers.js';
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = Router();

router.get('/', leerProductos);
router.get('/categoria/:categoria', leerProductoPorCategoria);
router.get('/:id', leerProductoPorId);
router.post('/', authMiddleware, agregarProducto);
router.put('/:id', authMiddleware, actualizarProducto);


export default router;

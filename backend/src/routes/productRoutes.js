import { Router } from 'express';
import { leerProductos, leerProductoPorCategoria, leerProductoPorId, agregarProducto, actualizarProducto, borrarProducto } from '../controllers/productControllers.js';
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = Router();

router.get('/', leerProductos);
router.get('/categoria/:categoria', leerProductoPorCategoria);
router.get('/:id', leerProductoPorId);
router.post('/', authMiddleware, agregarProducto);
router.put('/:id', authMiddleware, actualizarProducto);
router.delete('/:id', authMiddleware, borrarProducto);


export default router;

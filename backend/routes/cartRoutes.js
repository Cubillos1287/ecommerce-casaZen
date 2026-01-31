import { Router } from 'express';
import { obtenerCarritoUsuario, agregarProductoAlCarrito, eliminarProductoDelCarrito, eliminarItemCompletamente, checkout } from "../src/controllers/cartControllers.js"
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, obtenerCarritoUsuario);
router.post('/agregar', authMiddleware, agregarProductoAlCarrito);
router.put('/eliminar', authMiddleware, eliminarProductoDelCarrito);
router.delete('/:productId', authMiddleware, eliminarItemCompletamente);
router.post('/checkout', authMiddleware, checkout);


export default router;

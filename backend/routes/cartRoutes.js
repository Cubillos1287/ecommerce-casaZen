import { Router } from 'express';
import { obtenerCarritoUsuario, agregarProductoAlCarrito, eliminarProductoDelCarrito } from "../src/controllers/cartControllers.js"
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, obtenerCarritoUsuario);
router.post('/agregar', authMiddleware, agregarProductoAlCarrito);
router.put('/eliminar', authMiddleware, eliminarProductoDelCarrito);

export default router;

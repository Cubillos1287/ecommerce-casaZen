import { Router } from 'express';
import { obtenerCarritoUsuario, agregarProductoAlCarrito, eliminarProductoDelCarrito } from '../controllers/cartControllers.js';

const router = Router();

router.get('/carrito/usuario/:userId', obtenerCarritoUsuario);
router.post('/carrito/agregar', agregarProductoAlCarrito);
router.put('/carrito/eliminar', eliminarProductoDelCarrito);

export default router;

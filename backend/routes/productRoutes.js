import { Router } from 'express';
import { leerProductos, leerProductoPorCategoria, leerProductoPorId } from '../src/controllers/productControllers.js';

const router = Router();

router.get('/productos', leerProductos);
router.get('/productos/categoria/:categoria', leerProductoPorCategoria);
router.get('/productos/:id', leerProductoPorId);


export default router;

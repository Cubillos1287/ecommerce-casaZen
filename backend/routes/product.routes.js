import { Router } from 'express';
import { leerProductos } from '../controllers/product.controllers.js';

const router = Router();

router.get('/productos', leerProductos);

export default router;

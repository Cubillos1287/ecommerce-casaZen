import { Router } from 'express';
import { procesarCompra } from '../src/controllers/cart.controllers.js';

const router = Router();

router.post('/comprar', procesarCompra);

export default router;

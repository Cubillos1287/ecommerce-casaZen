import { Router } from 'express';
import { leerProductosController } from '../src/controllers/product.controllers.js';

const router = Router();

router.get("/productos", leerProductosController);

export default router;

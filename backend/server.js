import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
<<<<<<< HEAD
import productRoutes from './routes/product.routes.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import cartRoutes from './routes/cart.routes.js';
import authRoutes from "./routes/authRoutes.js"
=======
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
>>>>>>> origin/main

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(productRoutes);
<<<<<<< HEAD
app.use("/api/auth", authRoutes)



app.get("/" , (req, res) => res.send ("API OK "));
=======
app.use(cartRoutes);
>>>>>>> origin/main

app.listen(PORT, () => {
    console.log(`Servidor encendido en el puerto ${PORT}`);
});

export default app;

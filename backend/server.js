import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authMiddleware } from './src/middleware/authMiddleware.js';
import authRoutes from "./src/routes/authRoutes.js"
import productRoutes from './src/routes/productRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';
import favoritesRoutes from './src/routes/favoritesRoutes.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes)
app.use("/api/favoritos", favoritesRoutes)
app.use("/api/productos", productRoutes);
app.use("/api/carrito", cartRoutes);
app.use("/api/favorites", favoritesRoutes);



app.get("/", (req, res) => res.send("API OK "));

app.listen(PORT, () => {
    console.log(`Servidor encendido en el puerto ${PORT}`);
});

export default app;

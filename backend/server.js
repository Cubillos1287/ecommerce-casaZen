import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(productRoutes);
app.use(cartRoutes);

app.listen(PORT, () => {
    console.log(`Servidor encendido en el puerto ${PORT}`);
});

export default app;

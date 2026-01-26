import pool from './config.js';

export const obtenerProductos = async () => {
    const { rows } = await pool.query('SELECT * FROM products');
    return rows;
}
export const actualizarStock = async (id, stock) => {
    const { rows } = await pool.query('UPDATE products SET stock = stock - $1 WHERE id = $2 RETURNING *', [stock, id]);
    return rows;
}

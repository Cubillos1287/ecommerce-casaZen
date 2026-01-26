import pool from './config.js';

export const obtenerCarrito = async (userId) => {
    const { rows } = await pool.query('SELECT * FROM cart WHERE user_id = $1', [userId]);
    return rows;
}

export const obtenerItemsDelCarrito = async (cartId) => {
    const query = `
        SELECT 
            cart.id AS cart_id, 
            cart.user_id, 
            cart_items.id AS item_id, 
            cart_items.quantity, 
            products.id AS product_id, 
            products.nombre, 
            products.descripcion, 
            products.stock, 
            products.categoria, 
            products.precio, 
            products.img 
        FROM cart 
        LEFT JOIN cart_items ON cart_items.cart_id = cart.id 
        LEFT JOIN products ON cart_items.product_id = products.id 
        WHERE cart.id = $1
    `;
    const { rows } = await pool.query(query, [cartId]);
    return rows;
}

export const crearCarrito = async (userId) => {
    const { rows } = await pool.query('INSERT INTO cart (user_id) VALUES ($1) RETURNING *', [userId]);
    return rows[0];
}

export const agregarAlCarrito = async (cartId, productId, quantity) => {
    const { rows } = await pool.query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [cartId, productId, quantity]);
    return rows[0];
}

export const eliminarDelCarrito = async (cartId, productId) => {
    const { rows } = await pool.query('DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2 RETURNING *', [cartId, productId]);
    return rows[0];
}

export const vaciarCarrito = async (cartId) => {
    const { rows } = await pool.query('DELETE FROM cart_items WHERE cart_id = $1 RETURNING *', [cartId]);
    return rows[0];
}

export const editarCantidad = async (cartId, productId, quantity) => {
    const { rows } = await pool.query('UPDATE cart_items SET quantity = $3 WHERE cart_id = $1 AND product_id = $2 RETURNING *', [cartId, productId, quantity]);
    return rows[0];
}


import pool from '../config/db.js';

export const obtenerProductos = async () => {
    const { rows } = await pool.query('SELECT * FROM products');
    return rows;
}

export const obtenerProductoPorId = async (id) => {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return rows[0];
}
export const obtenerProductoPorCategoria = async (categoria) => {
    const { rows } = await pool.query('SELECT * FROM products WHERE categoria = $1', [categoria]);
    return rows;
}
export const actualizarStock = async (id, stock) => {
    const { rows } = await pool.query('UPDATE products SET stock = stock - $1 WHERE id = $2 RETURNING *', [stock, id]);
    return rows;
}

export const actualizaProducto = async (id, nombre, precio, stock, categoria, img, descripcion) => {
    const { rows } = await pool.query(
        'UPDATE products SET nombre = $2, precio = $3, stock = $4, categoria = $5, img = $6, descripcion = $7 WHERE id = $1 RETURNING *',
        [id, nombre, precio, stock, categoria, img, descripcion]
    );
    return rows[0];
}

export const obtenerProductoEnCarrito = async (id) => {
    const { rows } = await pool.query('SELECT * FROM cart_items WHERE product_id = $1', [id]);
    return rows.length > 0;
}

export const eliminarProducto = async (id) => {
    const { rows } = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
        return null;
    }
    return rows[0];
}

export const agregarProducto = async (nombre, precio, stock, categoria, img, descripcion) => {
    const { rows } = await pool.query(
        'INSERT INTO products (nombre, precio, stock, categoria, img, descripcion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [nombre, precio, stock, categoria, img, descripcion]
    );
    return rows[0];
}

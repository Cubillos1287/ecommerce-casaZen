
import pool from './config.js';

const createFavoritesTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS favorites (
      user_id INT,
      product_id INT,
      PRIMARY KEY (user_id, product_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `;
    try {
        await pool.query(query);
        console.log("Tabla 'favorites' creada con éxito");
    } catch (error) {
        console.error("Error al crear tabla 'favorites':", error);
    } finally {
        pool.end();
    }
};

createFavoritesTable();

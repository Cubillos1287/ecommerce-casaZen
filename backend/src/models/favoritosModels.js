import pool from "../../database/config.js";

export const getFavoriteProductIdsModel = async (userId) => {
  const { rows } = await pool.query(
    "SELECT product_id FROM favorites WHERE user_id = $1",
    [userId]
  );
  return rows.map((r) => r.product_id);
};

export const insertFavoriteModel = async (userId, productId) => {
  return pool.query(
    "INSERT INTO favorites (user_id, product_id) VALUES ($1, $2)",
    [userId, productId]
  );
};

export const deleteFavoriteModel = async (userId, productId) => {
  return pool.query(
    "DELETE FROM favorites WHERE user_id = $1 AND product_id = $2",
    [userId, productId]
  );
};

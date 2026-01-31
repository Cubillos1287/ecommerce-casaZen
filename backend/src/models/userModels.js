import pool from "../../database/config.js";
import bcrypt from 'bcryptjs';
import dotenv from "dotenv"
dotenv.config()

export const createUserModel = async ({ name, email, passwordHash }) => {
  const query = {
    text: `
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, name, email
    `,
    values: [name, email, passwordHash],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const getUserByEmailModel = async (email) => {
  const query = {
    text: `SELECT * FROM users WHERE email = $1`,
    values: [email],
  };
  const result = await pool.query(query);
  return result.rows[0] || null;
};

export const getUserByIdModel = async (id) => {
  const query = {
    text: `SELECT id, name , email, password_hash FROM users WHERE id = $1`,
    values: [id]
  };

  const result = await pool.query(query);
  return result.rows[0]; // Correction: result.row[0] -> result.rows[0]
};

export const updateUserModel = async (id, { name, email, passwordHash }) => {
  let queryText = "UPDATE users SET name = $1, email = $2";
  let values = [name, email];
  let count = 3;

  if (passwordHash) {
    queryText += `, password_hash = $${count}`;
    values.push(passwordHash);
    count++;
  }

  queryText += ` WHERE id = $${count} RETURNING id, name, email`;
  values.push(id);

  const query = {
    text: queryText,
    values: values,
  };

  const result = await pool.query(query);
  return result.rows[0];
};



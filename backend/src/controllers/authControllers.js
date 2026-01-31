import express from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
import { createUserModel, getUserByEmailModel, getUserByIdModel, updateUserModel } from "../models/userModels.js";


export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }


    if (password.length < 6) {
      return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
    }


    const exists = await getUserByEmailModel(email);
    if (exists) {
      return res.status(409).json({ message: "Email ya registrado" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await createUserModel({
      name,
      email,
      passwordHash: hashedPassword,

    });

    console.log("JWT_SECRET ", process.env.JWT_SECRET);
    console.log("BODY REGISTER:", req.body);




    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error("Error register:", error);
    return res.status(500).json({ message: "Error al crear el usuario" });
  }
};


//LOGIN  CONTROLER

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Email y password son obligatorios" });
    }

    const user = await getUserByEmailModel(email);
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const ok = bcrypt.compareSync(password, user.password_hash);

    if (!ok) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    const token = jwt.sign(
      { id: safeUser.id, email: safeUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token, user: safeUser });

  } catch (error) {
    console.error("Error login:", error);
    return res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

export const meController = async (req, res) => {
  try {
    const email = req.user.email;

    const usuario = await getUserByEmailModel(email);
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    const { password_hash, ...userWithoutPassword } = usuario;

    return res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Error /me:", error);
    return res.status(500).json({ message: "Error al consultar usuario" });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({ message: "Nombre y email son obligatorios" });
    }

    // Check if email belongs to another user
    const existingUser = await getUserByEmailModel(email);
    if (existingUser && existingUser.id !== userId) {
      return res.status(409).json({ message: "El email ya está en uso por otro usuario" });
    }

    let passwordHash = null;
    if (password && password.trim().length > 0) {
      if (password.length < 6) {
        return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
      }
      passwordHash = bcrypt.hashSync(password, 10);
    }

    const updatedUser = await updateUserModel(userId, { name, email, passwordHash });

    // Return fresh token if needed, or just the user
    // For simplicity, we return the user. The client might need to re-login if sensitive data changes or we can issue a new token here if the email changed (optional but good practice).

    return res.json({ user: updatedUser, message: "Perfil actualizado correctamente" });

  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Error al actualizar perfil" });
  }
};



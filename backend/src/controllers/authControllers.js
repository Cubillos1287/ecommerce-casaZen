import express from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
import { createUserModel, getUserByEmailModel, getUserByIdModel } from "../models/userModels.js";


export const registerContorller = async (req , res ) => {
  try {
    const  {name , email , password } = req.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({message: "Todos los campos son obligatorios."});
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
      email: user.email};

    const token = jwt.sign(
      { id: safeUser.id, email: safeUser.email},
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



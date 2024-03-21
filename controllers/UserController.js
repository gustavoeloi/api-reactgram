import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

// Gerenete JWT token
const generateToken = (user) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "7d" });
};

// Register a new user and sign
export const register = async (req, res) => {
  res.send("Register");
};

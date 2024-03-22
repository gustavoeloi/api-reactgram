import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: "7d" });
};

// Register a new user and sign
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res
      .status(422)
      .json({ errors: ["Por favor, utilize um e-mail não utilizado!"] });
    return;
  }

  // Generate hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  if (!newUser) {
    res
      .status(422)
      .json({ errors: ["Houve um imprevisto, tente novamente mais tarde"] });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

//Login
export const login = (req, res) => {
  res.send("Login...");
};

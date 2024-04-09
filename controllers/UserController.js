import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const jwtSecret = process.env.JWT_SECRET;

const generateHash = async (password) => {
  // Generate hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
};

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
  const passwordHash = await generateHash(password);

  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  if (!newUser) {
    return res
      .status(422)
      .json({ errors: ["Houve um imprevisto, tente novamente mais tarde"] });
  }

  return res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

//Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(401)
      .json({ errors: ["E-mail não encontrando em nossa base de dados"] });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ errors: ["Senha inválida"] });
  }

  return res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

// Get current user logged

export const getCurrentUser = async (req, res) => {
  const user = req.user;

  return res.status(200).json(user);
};

export const updateProfile = async (req, res) => {
  const { name, password, bio } = req.body;

  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  if (user) {
    user.name = name;
  }

  if (password) {
    const passwordHash = await generateHash(password);
    user.password = passwordHash;
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (bio) {
    user.bio = bio;
  }

  await user.save();

  res.status(200).json({ user });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ errors: ["Usuário não encontrado!"] });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ errors: ["Ocorreu um erro ao buscar usuário!"] });
  }
};

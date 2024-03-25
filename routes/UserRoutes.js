import express from "express";

import {
  register,
  login,
  getCurrentUser,
  updateProfile,
  getUserById,
} from "../controllers/UserController.js";

// middlewares
import validate from "../middlewares/handleValidation.js";
import {
  userCreateValidation,
  loginValidation,
  userUpdateValition,
} from "../middlewares/userValidation.js";
import { authGuard } from "../middlewares/authGuard.js";
import imageUpload from "../middlewares/imageUpload.js";

const router = express.Router();

router.post("/register", userCreateValidation(), validate, register);

router.post("/login", loginValidation(), validate, login);

router.get("/profile", authGuard, getCurrentUser);

router.get("/:id", getUserById);

router.put(
  "/",
  authGuard,
  userUpdateValition(),
  validate,
  imageUpload.single("profileImage"),
  updateProfile
);

export default router;

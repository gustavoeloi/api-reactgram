import express from "express";

import {
  register,
  login,
  getCurrentUser,
} from "../controllers/UserController.js";

// middlewares
import validate from "../middlewares/handleValidation.js";
import {
  userCreateValidation,
  loginValidation,
} from "../middlewares/userValidation.js";
import { authGuard } from "../middlewares/authGuard.js";

const router = express.Router();

router.post("/register", userCreateValidation(), validate, register);

router.post("/login", loginValidation(), validate, login);

router.get("/profile", authGuard, getCurrentUser);

export default router;

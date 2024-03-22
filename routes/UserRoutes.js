import express from "express";

import { register } from "../controllers/UserController.js";

// middlewares
import validate from "../middlewares/handleValidation.js";
import { userCreateValidation } from "../middlewares/userValidation.js";

const router = express.Router();

router.post("/register", userCreateValidation(), validate, register);

export default router;

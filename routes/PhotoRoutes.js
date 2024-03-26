import express from "express";
const router = express.Router();

import { insertPhoto, deletePhoto } from "../controllers/PhotoController.js";

// Middlewares
import { photosInsertValidation } from "../middlewares/photoValidation.js";
import { authGuard } from "../middlewares/authGuard.js";
import imageUpload from "../middlewares/imageUpload.js";
import validate from "../middlewares/handleValidation.js";

router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photosInsertValidation(),
  validate,
  insertPhoto
);

router.delete("/:id", authGuard, deletePhoto);

export default router;

import express from "express";
const router = express.Router();

import {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
} from "../controllers/PhotoController.js";

// Middlewares
import {
  photosInsertValidation,
  photoUpdateValidation,
  photoCommentValidation,
} from "../middlewares/photoValidation.js";
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

router.get("/", authGuard, getAllPhotos);

router.get("/user/:id", authGuard, getUserPhotos);

router.get("/:id", authGuard, getPhotoById);

router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto);

router.put("/like/:id", authGuard, likePhoto);

router.put(
  "/comment/:id",
  authGuard,
  photoCommentValidation(),
  validate,
  commentPhoto
);

export default router;

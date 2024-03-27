import Photo from "../models/Photo.js";
import mongoose from "mongoose";
import User from "../models/User.js";

// Insert a photo with an user related do it
export const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);
  console.log(user);

  // Creating photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: new mongoose.Types.ObjectId(user._id),
    userName: user.name,
  });

  if (!newPhoto) {
    res
      .status(402)
      .json({ errors: ["Houve um problema, tente novamente mais tarde!"] });
    return;
  }

  res.status(201).json({ newPhoto });
};

export const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    const photo = await Photo.findById(id);

    if (!photo) {
      return res.status(404).json({ errors: ["Foto não encontrada"] });
    }

    if (!photo.userId?.equals(reqUser._id)) {
      return res
        .status(422)
        .json({ errors: ["Você não tem permissão para excluir esta foto"] });
    }

    const photoDelete = await Photo.findByIdAndDelete(id);

    if (!photoDelete) {
      return res.status(404).json({ errors: ["Foto não encontrada"] });
    }

    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluída com sucesso!" });
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ errors: "Ocorreu um erro, tente novamente mais tarde" });
  }
};

// Get All Photos
export const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

//Get All photos by User
export const getUserPhotos = async (req, res) => {
  const { id } = req.params;
  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

// Get image by id
export const getPhotoById = async (req, res) => {
  const { id } = req.params;

  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
  }

  return res.status(200).json(photo);
};

// Edit Image
export const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  console.log(req.body);

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  if (!photo) {
    return res.status(404).json({ errors: ["Foto não encontrada!"] });
  }

  if (!photo.userId?.equals(reqUser._id)) {
    return res
      .status(401)
      .json({ errors: ["Você não tem permissão para alterar essa foto"] });
  }

  if (title) {
    photo.title = title;
  }

  await photo.save();

  return res.status(200).json({ message: "Foto alterada com sucesso!", photo });
};

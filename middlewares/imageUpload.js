import multer from "multer";
import path from "path";

// Where will the image be stored
const imageStore = multer.diskStorage({
  destination: (req, file, callback) => {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }

    callback(null, `uploads/${folder}/`);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStore,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // only png and jpg formats are stored
      return cb(
        new Error("Apenas imagens no formato .jpg ou .png são aceitos")
      );
    }
    cb(undefined, true);
  },
});

export default imageUpload;

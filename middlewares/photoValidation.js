import { body } from "express-validator";

export const photosInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório")
      .isString()
      .withMessage("O título é obrigatório")
<<<<<<< HEAD
      .isLength({ min: 6 })
      .withMessage("O título precisa ter no mínimo 6 caracteres"),
=======
      .isLength({ min: 3 })
      .withMessage("O título precisa ter no mínimo 3 caracteres"),
>>>>>>> d4847e35589f27b8c7c6736cbb7da8d38c130d98
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("A imagem é obrigatória");
      }
      return true;
    }),
  ];
};
<<<<<<< HEAD

export const photoUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O título é obrigatório!")
      .isLength({ min: 6 })
      .withMessage("O título precisa ter no mínimo 6 caracteres"),
  ];
};

export const photoCommentValidation = () => {
  return [
    body("comment")
      .notEmpty()
      .withMessage("O comentário é obrigatório!")
      .isLength({ min: 5 })
      .withMessage("O comentário deve ter no mínimo 5 caracteres"),
  ];
};
=======
>>>>>>> d4847e35589f27b8c7c6736cbb7da8d38c130d98

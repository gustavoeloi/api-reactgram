import { body } from "express-validator";

export const photosInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório")
      .isString()
      .withMessage("O título é obrigatório")
      .isLength({ min: 6 })
      .withMessage("O título precisa ter no mínimo 6 caracteres"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("A imagem é obrigatória");
      }
      return true;
    }),
  ];
};

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

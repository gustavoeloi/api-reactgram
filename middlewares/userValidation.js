import { body } from "express-validator";

export const userCreateValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("O nome é obrigatório!")
      .isLength({ min: 5 })
      .withMessage("O nome precisa ter no mínimo 5 caracteres"),
    body("email")
      .notEmpty()
      .withMessage("O email é obrigatório!")
      .isEmail()
      .withMessage("O email precisa ser válido"),
    body("password")
      .notEmpty()
      .withMessage("A senha é obrigatória!")
      .isLength({ min: 6 })
      .withMessage("A senha precisa ter no mínimo 6 caracteres!"),
    body("confirmpassword")
      .notEmpty()
      .withMessage("A confirmação de senha é obrigatória")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("As senhas não são iguais!");
        }
        return true;
      }),
  ];
};

export const loginValidation = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Informe o e-mail")
      .isEmail()
      .withMessage("Informe um e-mail válido"),
    body("password")
      .notEmpty()
      .withMessage("Informe a senha")
      .isLength({ min: 6 })
      .withMessage("O mínimo de caracteres é 6"),
  ];
};

export const userUpdateValition = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 5 })
      .withMessage("O nome precisa ter no mínimo 5 caracteres"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("A senha precisa ter no mínimo 6 caracteres!"),
  ];
};

import { body, validationResult } from "express-validator";
import { findUserByUsername } from "../models/userModel.js";

const validate = (validators, view, options = {}) => [
  validators,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render(view, {
        ...options,
        data: { ...req.body },
        errors: errors.array(),
      });
    }

    next();
  },
];

const textValidator = (field, { alias = null, isMessage = false } = {}) => {
  const chain = body(field)
    .trim()
    .notEmpty()
    .withMessage(
      `You must enter your ${isMessage ? "message's " : ""}${alias || field}.`,
    );

  if (alias) {
    return chain
      .isAlpha("en-US", { ignore: " '-" })
      .withMessage(
        `Your ${alias} must contain letters and can only include spaces, apostrophes, and hyphen.`,
      );
  } else if (field === "username") {
    return chain
      .isAlphanumeric("en-US", { ignore: "_.-" })
      .withMessage(
        "Your username can only contain letters, numbers, underscores, periods and hyphens.",
      );
  } else {
    return chain;
  }
};

export const validateSignUp = validate(
  [
    textValidator("firstName", { alias: "first name" }),
    textValidator("lastName", { alias: "last name" }),
    textValidator("username")
      .bail()
      .custom(async (value) => {
        const user = await findUserByUsername(value);
        if (user) {
          throw new Error("This username is already in use.");
        }
      }),
    body("password")
      .isStrongPassword()
      .withMessage(
        "Your password must have at least 8 characters containing at least one lowercase, uppercase, number and symbol.",
      ),
    body("confirmPassword")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("The passwords must match."),
  ],
  "auth-form",
  { mode: "sign-up" },
);

export const validateSignIn = validate(
  [
    body("username", "You must enter your username.").notEmpty(),
    body("password", "You must enter your password.").notEmpty(),
  ],
  "auth-form",
  { mode: "sign-in" },
);

export const validateMessage = validate(
  [
    textValidator("title", { isMessage: true }),
    textValidator("content", { isMessage: true }),
  ],
  "message-form",
);

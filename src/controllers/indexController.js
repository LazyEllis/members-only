import bcrypt from "bcryptjs";
import { createUser } from "../models/userModel.js";
import { findRoleByName } from "../models/roleModel.js";

export const renderSignUpForm = (req, res) => {
  res.render("auth-form", { mode: "sign-up" });
};

export const signUp = async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const role = await findRoleByName("USER");

  await createUser({
    firstName,
    lastName,
    username,
    password: hashedPassword,
    role,
  });
  res.redirect("/");
};

export const renderSignInForm = (req, res) => {
  const { messages } = req.session;

  const errors = messages ? [{ msg: messages[0] }] : undefined;

  if (messages) {
    req.session.messages = undefined;
  }

  res.render("auth-form", { mode: "sign-in", errors });
};

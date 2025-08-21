import bcrypt from "bcryptjs";
import { createUser } from "../models/userModel.js";
import { findRoleByName } from "../models/roleModel.js";

export const renderSignUpForm = (req, res) => {
  res.render("auth-form");
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

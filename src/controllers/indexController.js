import bcrypt from "bcryptjs";
import { findMessages } from "../models/messageModel.js";
import { createUser, updateUserRole } from "../models/userModel.js";
import { findRoleByName } from "../models/roleModel.js";

export const renderHomePage = async (req, res) => {
  const messages = await findMessages();
  res.render("index", { messages });
};

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

export const signOut = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    res.redirect("/");
  });
};

export const renderRoleUpgradeForm = (req, res) => {
  res.render("role-upgrade-form");
};

export const upgradeRole = async (req, res) => {
  const { passcode } = req.body;
  const { id, role } = req.user;
  const { CLUB_PASSCODE, ADMIN_PASSCODE } = process.env;

  const isMember = role === "MEMBER";
  const rolePasscode = isMember ? ADMIN_PASSCODE : CLUB_PASSCODE;

  if (passcode !== rolePasscode) {
    return res.status(403).render("role-upgrade-form", { error: true });
  }

  const newRole = await findRoleByName(isMember ? "ADMIN" : "MEMBER");

  await updateUserRole(id, { role: newRole });
  res.redirect("/");
};

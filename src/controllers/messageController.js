import { createMessage } from "../models/messageModel.js";

export const renderMessageForm = (req, res) => {
  res.render("message-form");
};

export const sendMessage = async (req, res) => {
  const { title, content } = req.body;

  await createMessage({ title, content, user: req.user.id });
  res.redirect("/");
};

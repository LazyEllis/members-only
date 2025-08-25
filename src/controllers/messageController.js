import { createMessage, removeMessage } from "../models/messageModel.js";

export const renderMessageForm = (req, res) => {
  res.render("message-form");
};

export const sendMessage = async (req, res) => {
  const { title, content } = req.body;

  await createMessage({ title, content, user: req.user.id });
  res.redirect("/");
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;

  await removeMessage(id);
  res.redirect("/");
};

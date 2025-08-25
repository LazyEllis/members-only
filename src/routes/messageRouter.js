import { Router } from "express";
import { requireAdmin, requireAuth } from "../lib/auth.js";
import {
  deleteMessage,
  renderMessageForm,
  sendMessage,
} from "../controllers/messageController.js";
import { validateMessage } from "../lib/validators.js";

const messageRouter = Router();

messageRouter.get("/send", requireAuth, renderMessageForm);

messageRouter.post("/send", requireAuth, validateMessage, sendMessage);

messageRouter.post("/:id/delete", requireAdmin, deleteMessage);

export default messageRouter;

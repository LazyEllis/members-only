import { Router } from "express";
import { requireAuth } from "../lib/auth.js";
import {
  renderMessageForm,
  sendMessage,
} from "../controllers/messageController.js";
import { validateMessage } from "../lib/validators.js";

const messageRouter = Router();

messageRouter.get("/send", requireAuth, renderMessageForm);

messageRouter.post("/send", requireAuth, validateMessage, sendMessage);

export default messageRouter;

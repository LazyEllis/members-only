import { Router } from "express";
import { requireAuth } from "../lib/auth.js";
import { renderMessageForm } from "../controllers/messageController.js";

const messageRouter = Router();

messageRouter.get("/send", requireAuth, renderMessageForm);

export default messageRouter;

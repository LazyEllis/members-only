import { Router } from "express";
import { signUp, renderSignUpForm } from "../controllers/indexController.js";
import { validateSignUp } from "../lib/validators.js";

const indexRouter = Router();

indexRouter.get("/sign-up", renderSignUpForm);

indexRouter.post("/sign-up", validateSignUp, signUp);

export default indexRouter;

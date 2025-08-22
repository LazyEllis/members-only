import { Router } from "express";
import passport from "passport";
import {
  signOut,
  signUp,
  renderSignInForm,
  renderSignUpForm,
} from "../controllers/indexController.js";
import { validateSignIn, validateSignUp } from "../lib/validators.js";

const indexRouter = Router();

indexRouter.get("/sign-up", renderSignUpForm);

indexRouter.post("/sign-up", validateSignUp, signUp);

indexRouter.get("/sign-in", renderSignInForm);

indexRouter.post(
  "/sign-in",
  validateSignIn,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign-in",
    failureMessage: true,
  }),
);

indexRouter.get("/sign-out", signOut);

export default indexRouter;

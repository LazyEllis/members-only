import { Router } from "express";
import passport from "passport";
import {
  signOut,
  signUp,
  renderSignInForm,
  renderSignUpForm,
  upgradeRole,
  renderRoleUpgradeForm,
  renderHomePage,
} from "../controllers/indexController.js";
import { validateSignIn, validateSignUp } from "../lib/validators.js";
import { requireAuth, requireGuest, requireNonAdmin } from "../lib/auth.js";

const indexRouter = Router();

indexRouter.get("/", renderHomePage);

indexRouter.get("/sign-up", requireGuest, renderSignUpForm);

indexRouter.post("/sign-up", requireGuest, validateSignUp, signUp);

indexRouter.get("/sign-in", requireGuest, renderSignInForm);

indexRouter.post(
  "/sign-in",
  requireGuest,
  validateSignIn,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign-in",
    failureMessage: true,
  }),
);

indexRouter.get("/sign-out", requireAuth, signOut);

indexRouter.get("/upgrade-role", requireNonAdmin, renderRoleUpgradeForm);

indexRouter.post("/upgrade-role", requireNonAdmin, upgradeRole);

export default indexRouter;

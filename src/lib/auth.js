import { ForbiddenError, UnauthorizedError } from "./errors.js";

export const requireGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  next();
};

export const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new UnauthorizedError(
      "You must be logged in to access this page or perform this action.",
    );
  }

  next();
};

export const requireNonAdmin = [
  requireAuth,
  (req, res, next) => {
    if (req.user.role === "ADMIN") {
      return res.redirect("/");
    }

    next();
  },
];

export const requireAdmin = [
  requireAuth,
  (req, res, next) => {
    if (req.user.role !== "ADMIN") {
      throw new ForbiddenError(
        "Only administrators can access this page or perform this action.",
      );
    }

    next();
  },
];

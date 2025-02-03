import { Router } from "express";
import { authController } from "../controllers/index.js";
import { validateData } from "../middlewares/validation.middleware.js";
import {
  userLoginSchema,
  userRegistrationSchema,
} from "../validation/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

authRouter.post(
  "/register",
  validateData(userRegistrationSchema),
  authController.register
);

authRouter.post("/login", validateData(userLoginSchema), authController.login);

authRouter.get("/profile", authMiddleware, authController.profile);

authRouter.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  return res.status(500).json(err);
});

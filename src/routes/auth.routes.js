import  { Router } from "express";
import {register, login} from "../controllers/auth.controller.js";
import {body} from "express-validator";
import {authMiddleware} from "../middleware/auth.middleware.js";
import { validateData } from "../middleware/validation.middleware.js";
import { userRegistrationSchema } from "../validations/index.js";
export const authRouter = Router();

authRouter.post(
    "/register",
   validateData(userRegistrationSchema),
    register
);

authRouter.post("/login", login);

authRouter.get("/profile", authMiddleware, (req, res) => {
    res.json({user: req.user});
});


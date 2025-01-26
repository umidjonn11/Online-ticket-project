import { Router } from "express";
import { authController } from "../controllers/index.js";

export const authRouter = Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.get('/profile', authController.profile)
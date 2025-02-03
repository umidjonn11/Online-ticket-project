import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { articleRouter } from "./article.routes.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/articles", articleRouter);

import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { categoryRouter } from "./category.routes.js";
import { articleRouter } from "./article.routes.js";
import { commentRouter } from "../routes/commnet.routes.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/category", categoryRouter);
apiRouter.use("/article", articleRouter);
apiRouter.use("/comment", commentRouter);

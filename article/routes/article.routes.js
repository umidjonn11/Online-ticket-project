// routes/article.routes.js
import { Router } from "express";
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/index.js";
import { validateData } from "../middlewares/validation.middleware.js";
import { createArticleSchema, updateArticleSchema } from "../validation/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";



export const articleRouter = Router();

articleRouter.post("/",authMiddleware, validateData(createArticleSchema),createArticle);

articleRouter.get("/", getAllArticles);

articleRouter.get("/:id", getArticleById);

articleRouter.put("/:id",authMiddleware ,validateData(updateArticleSchema),updateArticle);

articleRouter.delete("/:id",authMiddleware, deleteArticle);


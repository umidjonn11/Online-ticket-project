import { Router } from "express";
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/index.js";

import { validateData } from "../middleware/validation.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createArticleSchema, updateArticleSchema } from "../validations/index.js";

export const articleRouter = Router();

articleRouter.get("/", getAllArticles);
articleRouter.get("/:id", getArticleById);
articleRouter.post("/",validateData(createArticleSchema) ,authMiddleware, createArticle);
articleRouter.put("/:id",validateData(updateArticleSchema) ,authMiddleware, updateArticle);
articleRouter.delete("/:id", authMiddleware, deleteArticle);

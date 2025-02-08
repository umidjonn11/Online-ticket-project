import  { Router } from "express";
import { createCategory, getAllCategories, getCategoryById, deleteCategory } from "../controllers/index.js";
import { authMiddleware } from "../middleware/auth.middleware.js"; 
import { validateData } from "../middleware/validation.middleware.js";
import { categoryCreateSchema } from "../validations/index.js";
export const categoryRouter = Router();

categoryRouter.post("/",validateData(categoryCreateSchema) ,authMiddleware, createCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.delete("/:id", authMiddleware, deleteCategory);


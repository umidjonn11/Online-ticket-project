import { Router } from "express";
import { createComment, getAllComments, getCommentById, deleteComment } from "../controllers/comment.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js"; 
import { validateData } from "../middleware/validation.middleware.js";
import { createCommnetSchema } from "../validations/index.js";


export const commentRouter = Router();

commentRouter.post("/",validateData(createCommnetSchema), authMiddleware, createComment);
commentRouter.get("/", getAllComments);
commentRouter.get("/:id", getCommentById);
commentRouter.delete("/:id", authMiddleware, deleteComment);


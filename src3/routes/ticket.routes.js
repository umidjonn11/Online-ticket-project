import { Router } from "express";
import { ticketController } from "../controllers/index.js";
import { createTicketSchema, updateTicketSchema } from "../validation/index.js";
import { validateData } from "../middlewares/validationMiddleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
export const ticketRouter = Router();

ticketRouter.get("/", ticketController.getAll);
ticketRouter.get("/:id", ticketController.getById);
ticketRouter.post("/",authMiddleware,validateData(createTicketSchema), ticketController.create);
ticketRouter.put("/:id",authMiddleware,validateData(updateTicketSchema), ticketController.update);
ticketRouter.delete("/:id", authMiddleware,ticketController.delete);
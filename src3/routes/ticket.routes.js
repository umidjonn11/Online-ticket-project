import { Router } from "express";
import { ticketController } from "../controllers/index.js";

export const ticketRouter = Router();

ticketRouter.get("/", ticketController.getAll);
ticketRouter.get("/:id", ticketController.getById);
ticketRouter.post("/", ticketController.create);
ticketRouter.put("/:id", ticketController.update);
ticketRouter.delete("/:id", ticketController.delete);
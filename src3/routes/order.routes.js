import { Router } from "express";
import { orderController } from "../controllers/index.js";
import { validateData } from "../middlewares/validationMiddleware.js";
import { createOrderScema, updateOrderSchema } from "../validation/order.js";

export const orderRouter = Router();

orderRouter.get("/", orderController.getAll);
orderRouter.get("/:id", orderController.getById);
orderRouter.post("/",validateData(createOrderScema), orderController.create);
orderRouter.put("/:id", validateData(updateOrderSchema),orderController.update);
orderRouter.delete("/:id", orderController.delete);
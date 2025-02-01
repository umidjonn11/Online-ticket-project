import { z } from "zod";

export const createOrderScema = z.object({
  totalPrice: z.number(),
  status: z.enum(["pending", "paid", "cancelled"]).default("pending"),
});

export const updateOrderSchema = z.object({
  status: z.enum(["paid", "cancelled"]),
});

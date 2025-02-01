import { optional, z } from "zod";

export const createTicketSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  status: z.string().default("available"),
  price: z.number(),
  location: z.string(),
  totalQuantity: z.number(),
  soldQuantity: z.number(),
});

export const updateTicketSchema = z.object({
  status: z.enum(["sold", "expired"]).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  price: z.number().optional(),
  status: z.string().optional(),
  totalQuantity: z.number().optional()
});

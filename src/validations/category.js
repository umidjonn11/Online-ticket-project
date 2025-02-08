import { z } from "zod";

export const categoryCreateSchema = z.object({
  name: z.string(),
  description: z.string(),
});

// export const updateCategorySchema = z.object({
//   name: z.string().optional(),
//   description: z.string().optional(),
// });

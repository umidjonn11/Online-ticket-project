import { z } from "zod";

export const createCommnetSchema = z.object({
  content: z.string(),
});

// export const updateCommentSchema = z.object({
//   content: z.string().optional(),
// });

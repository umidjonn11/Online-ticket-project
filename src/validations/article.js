import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateArticleSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

// validation/article.validation.js
import { z } from "zod";

export const createArticleSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title should have at least 3 characters" })
    .max(255, { message: "Title should have a maximum of 255 characters" })
    .nonempty({ message: "Title is required" }),
  content: z
    .string()
    .min(10, { message: "Content should have at least 10 characters" })
    .nonempty({ message: "Content is required" }),
});

export const updateArticleSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title should have at least 3 characters" })
    .max(255, { message: "Title should have a maximum of 255 characters" })
    .optional(),
  content: z
    .string()
    .min(10, { message: "Content should have at least 10 characters" })
    .optional(),
});

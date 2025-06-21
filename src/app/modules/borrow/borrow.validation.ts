import { z } from "zod";

export const borrowBookZodSchema = z.object({
  body: z.object({
    book: z.string().min(1, "Book ID is required"),
    quantity: z.number().int().min(1, "Quantity must be at least 1"),
    dueDate: z.string().refine(date => !isNaN(Date.parse(date)), {
      message: "Invalid due date format",
    }),
  }),
});
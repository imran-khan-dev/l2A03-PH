import express from "express";
import { createBook } from "./createBook.controller";
import { getAllBooks } from "./getAllBooks.controller";
import { getBookById } from "./getBookById.controller";
import { updateBook } from "./updateBook.controller";
import { deleteBook } from "./deleteBook.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createBookZodSchema } from "./book.validation";

export const bookRoutes = express.Router();

bookRoutes.post("/", validateRequest(createBookZodSchema), createBook);
bookRoutes.get("/", getAllBooks);
bookRoutes.get("/:bookId", getBookById);
bookRoutes.put("/:bookId", updateBook);
bookRoutes.delete("/:bookId", deleteBook);

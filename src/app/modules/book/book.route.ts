import express from "express";
import { createBook } from "./createBook.controller";
import { getAllBooks } from "./getAllBooks.controller";
import { getBookById } from "./getBookById.controller";
import validateRequest from "../book/validateRequest";
import { createBookZodSchema } from "./book.validation";

export const bookRoutes = express.Router();

bookRoutes.post("/", validateRequest(createBookZodSchema), createBook);
bookRoutes.get("/", getAllBooks);
bookRoutes.get("/:bookId", getBookById);

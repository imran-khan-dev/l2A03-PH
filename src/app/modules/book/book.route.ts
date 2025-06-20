import express from "express";
import { createBook } from "./book.controller";
import validateRequest from "../book/validateRequest";
import { createBookZodSchema } from "./book.validation";

export const bookRoutes = express.Router();

bookRoutes.post("/", validateRequest(createBookZodSchema), createBook);

import express from "express";
import { bookRoutes } from "../modules/book/book.route";
import { borrowRoutes } from "../modules/borrow/borrow.route";

export const routes = express.Router();

// Book routes
routes.use("/books", bookRoutes);
// Borrow routes
routes.use("/borrow", borrowRoutes);

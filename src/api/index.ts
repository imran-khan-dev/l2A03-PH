import express from "express";
import serverless from "serverless-http";
import { bookRoutes } from "../app/modules/book/book.route";
import { borrowRoutes } from "../app/modules/borrow/borrow.route";
import { json } from "body-parser";

const app = express();

app.use(json());

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

export const handler = serverless(app);

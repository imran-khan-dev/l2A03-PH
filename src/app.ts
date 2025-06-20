import express from "express";
import cors from "cors";
import { routes } from "./app/routes/index";
import { globalErrorHandler } from "./app/middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Library API is Running...");
});

app.use("/api", routes);

app.use(globalErrorHandler);

export default app;

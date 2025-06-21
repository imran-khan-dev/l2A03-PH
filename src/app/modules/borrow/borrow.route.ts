import express from "express";
import { borrowBook, getBorrowSummary } from "./borrow.controller";
import validateRequest from "../../middlewares/validateRequest";
import { borrowBookZodSchema } from "./borrow.validation";

const router = express.Router();

router.post("/", validateRequest(borrowBookZodSchema), borrowBook);
router.get("/", getBorrowSummary);

export const borrowRoutes = router;

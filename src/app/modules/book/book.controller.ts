import { Request, Response, NextFunction } from "express";
import { Book } from "./book.model";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

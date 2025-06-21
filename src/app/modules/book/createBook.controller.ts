import { Request, Response, NextFunction } from "express";
import { Book } from "./book.model";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.create(req.body);
    const { ...bookData } = book.toObject();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: bookData,
    });
  } catch (error) {
    next(error);
  }
};

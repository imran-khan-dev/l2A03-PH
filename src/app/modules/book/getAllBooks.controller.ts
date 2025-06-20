import { Request, Response, NextFunction } from "express";
import { Book } from "./book.model";

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "asc",
      limit = "10",
    } = req.query;

    const filterConditions: any = {};
    if (filter) {
      filterConditions.genre = filter;
    }

    const books = await Book.find(filterConditions)
      .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
      .limit(parseInt(limit as string))
      .lean();

    const cleanedBooks = books.map(({ __v, ...rest }) => rest);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: cleanedBooks,
    });
  } catch (error) {
    next(error);
  }
};

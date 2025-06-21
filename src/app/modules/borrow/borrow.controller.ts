import { Request, Response, NextFunction } from "express";
import { Borrow } from "./borrow.model";
import { Book } from "../book/book.model";

type BorrowBookRequestBody = {
  book: string;
  quantity: number;
  dueDate: string;
};

export const borrowBook = async (
  req: Request<{}, {}, BorrowBookRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { book, quantity, dueDate } = req.body;

    const foundBook = await Book.findById(book);
    if (!foundBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (foundBook.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough copies available",
      });
    }

    foundBook.copies -= quantity;
    await foundBook.save();

    await Book.updateAvailability(String(foundBook._id));

    const result = await Borrow.create({ book, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getBorrowSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

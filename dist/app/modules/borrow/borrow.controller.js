"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummary = exports.borrowBook = void 0;
const borrow_model_1 = require("./borrow.model");
const book_model_1 = require("../book/book.model");
const borrowBook = async (req, res, next) => {
    try {
        const { book, quantity, dueDate } = req.body;
        const foundBook = await book_model_1.Book.findById(book);
        if (!foundBook) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
            return;
        }
        if (foundBook.copies < quantity) {
            res.status(400).json({
                success: false,
                message: "Not enough copies available",
            });
            return;
        }
        foundBook.copies -= quantity;
        await foundBook.save();
        await book_model_1.Book.updateAvailability(String(foundBook._id));
        const result = await borrow_model_1.Borrow.create({ book, quantity, dueDate });
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.borrowBook = borrowBook;
const getBorrowSummary = async (req, res, next) => {
    try {
        const result = await borrow_model_1.Borrow.aggregate([
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
    }
    catch (error) {
        next(error);
    }
};
exports.getBorrowSummary = getBorrowSummary;

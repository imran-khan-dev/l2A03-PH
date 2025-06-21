"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookById = void 0;
const book_model_1 = require("./book.model");
const getBookById = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const book = await book_model_1.Book.findById(bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                error: {
                    message: `No book found with ID ${bookId}`,
                },
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getBookById = getBookById;

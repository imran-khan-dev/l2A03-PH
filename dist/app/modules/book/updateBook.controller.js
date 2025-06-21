"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = void 0;
const book_model_1 = require("./book.model");
const mongoose_1 = __importDefault(require("mongoose"));
const updateBook = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(bookId)) {
            res.status(400).json({
                success: false,
                message: "Invalid Book ID",
                error: {
                    message: "The provided Book ID is not valid",
                },
            });
            return;
        }
        const updatedBook = await book_model_1.Book.findByIdAndUpdate(bookId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateBook = updateBook;

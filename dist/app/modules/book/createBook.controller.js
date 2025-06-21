"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = void 0;
const book_model_1 = require("./book.model");
const createBook = async (req, res, next) => {
    try {
        const book = await book_model_1.Book.create(req.body);
        const { ...bookData } = book.toObject();
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: bookData,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createBook = createBook;

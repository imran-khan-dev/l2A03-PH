"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBooks = void 0;
const book_model_1 = require("./book.model");
const getAllBooks = async (req, res, next) => {
    try {
        const { filter, sortBy = "createdAt", sort = "asc", limit = "10", } = req.query;
        const filterConditions = {};
        if (filter) {
            filterConditions.genre = filter;
        }
        const books = await book_model_1.Book.find(filterConditions)
            .sort({ [sortBy]: sort === "desc" ? -1 : 1 })
            .limit(parseInt(limit))
            .lean();
        const cleanedBooks = books.map(({ ...rest }) => rest);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: cleanedBooks,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllBooks = getAllBooks;

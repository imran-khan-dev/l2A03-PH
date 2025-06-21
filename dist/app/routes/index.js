"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const book_route_1 = require("../modules/book/book.route");
const borrow_route_1 = require("../modules/borrow/borrow.route");
exports.routes = express_1.default.Router();
// Book routes
exports.routes.use("/books", book_route_1.bookRoutes);
// Borrow routes
exports.routes.use("/borrow", borrow_route_1.borrowRoutes);

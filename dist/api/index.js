"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const book_route_1 = require("../app/modules/book/book.route");
const borrow_route_1 = require("../app/modules/borrow/borrow.route");
const body_parser_1 = require("body-parser");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use("/api/books", book_route_1.bookRoutes);
app.use("/api/borrow", borrow_route_1.borrowRoutes);
exports.handler = (0, serverless_http_1.default)(app);

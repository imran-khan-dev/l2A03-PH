"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBookZodSchema = void 0;
const zod_1 = require("zod");
exports.borrowBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        book: zod_1.z.string().min(1, "Book ID is required"),
        quantity: zod_1.z.number().int().min(1, "Quantity must be at least 1"),
        dueDate: zod_1.z.string().refine(date => !isNaN(Date.parse(date)), {
            message: "Invalid due date format",
        }),
    }),
});

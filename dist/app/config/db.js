"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connectDB = async () => {
    try {
        await (0, mongoose_1.connect)(process.env.MONGODB_URI);
        console.log("MongoDB Connected!");
    }
    catch (error) {
        console.error("MongoDB Connection Failed!", error);
        process.exit(1);
    }
};
exports.default = connectDB;

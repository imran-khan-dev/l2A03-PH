"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + "/../.env" });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./app/config/db"));
console.log("Server is starting...");
const port = process.env.PORT || 5000;
const run = async () => {
    await (0, db_1.default)();
    app_1.default.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};
run();

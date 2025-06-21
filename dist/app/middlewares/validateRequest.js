"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse({ body: req.body });
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = validateRequest;

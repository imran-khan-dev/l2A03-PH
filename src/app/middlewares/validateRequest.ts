import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;

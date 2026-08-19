import { NextFunction, Request, Response } from "express";
import z, { ZodType } from "zod";

export function validateBody(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid Data Format.",
        errors: z.treeifyError(result.error),
      });
    }

    req.dataBody = result.data;
    next();
  };
}

export function validateQuery(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success)
      return res.status(400).json({
        message: "Invalid Data Format.",
        errors: z.treeifyError(result.error),
      });

    req.dataQuery = result.data;
    next();
  };
}

export function validateParams(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success)
      return res.status(400).json({
        message: "Invalid Data Format.",
        errors: z.treeifyError(result.error),
      });

    req.dataParams = result.data;
    next();
  };
}

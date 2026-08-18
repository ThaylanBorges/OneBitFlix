import { NextFunction, Request, Response } from "express";
import z, { ZodObject } from "zod";

export const validate = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success)
      return res.status(400).json({
        message: "Invalid Data.",
        erros: z.treeifyError(result.error),
      });

    req.body = result.data;

    next();
  };
};

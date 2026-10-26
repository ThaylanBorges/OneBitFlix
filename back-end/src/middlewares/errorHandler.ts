import { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";
import { AppError } from "../errors/AppError.js";
import { ForeignKeyConstraintError, UniqueConstraintError } from "sequelize";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({
      status: "error",
      message: "A value provided is already in use",
    });
  }

  if (err instanceof ForeignKeyConstraintError) {
    return res.status(409).json({
      status: "error",
      message: "The operation conflicts with related records",
    });
  }

  console.log("[Unhandled Error]", err);

  return res.status(500).json({
    status: "error",
    message:
      env.NODE_ENV === "production"
        ? "Internal server error"
        : err instanceof Error
          ? err.message
          : "Unknown error",
  });
}

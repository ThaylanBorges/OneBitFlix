import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService.js";
import { AppError } from "../errors/AppError.js";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.token;

  if (!token) return next(new AppError("Token not found", 401));

  try {
    const payload = jwtService.verifySessionToken(token);

    req.user = payload;
    next();
  } catch (err) {
    next(new AppError("Token expired or invalid", 401));
  }
}

export function authMiddlewareQuery(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { token } = req.query;

  if (!token || typeof token !== "string")
    return next(new AppError("Token not found", 401));

  try {
    const payload = jwtService.verifyStreamToken(token);
    req.stream = payload;
    next();
  } catch (err) {
    next(new AppError("Token expired or invalid", 401));
  }
}

import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService.js";
import { AppError } from "../errors/AppError.js";

interface JwtPayload {
  id: number;
  firstName: string;
  email: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const payload = jwtService.verifyToken(token) as JwtPayload;
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
    throw new AppError("Token Not Found", 404);

  try {
    const payload = jwtService.verifyToken(token) as JwtPayload;
    req.user = payload;
    next();
  } catch (err) {
    next(new AppError("Token expired or invalid", 401));
  }
}

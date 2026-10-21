import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService.js";
import { AppError } from "../errors/AppError.js";
import { usersServices } from "../services/userService.js";

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

export async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userId = req.user!.id;

  try {
    const user = await usersServices.findById(userId);

    if (!user) return next(new AppError("Token not found", 401));

    if (user.role !== "admin") return next(new AppError("Access denied", 403));

    next();
  } catch (err) {
    next(err);
  }
}

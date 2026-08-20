import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService.js";

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
  } catch (err) {
    next(err);
  }
}

export function authMiddlewareQuery(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { token } = req.query;

  if (!token || typeof token !== "string")
    return res.status(401).json({ message: "Token Not Found" });

  try {
    const payload = jwtService.verifyToken(token) as JwtPayload;
    req.user = payload;
  } catch (err) {
    next(err);
  }
}

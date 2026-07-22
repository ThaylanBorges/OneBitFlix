import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService.js";

interface TokenPayload {
  id: number;
  firstName: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token not found" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwtService.verifyToken(token) as TokenPayload;
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token expired or invalid" });
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
    const payload = jwtService.verifyToken(token) as TokenPayload;
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token expired or invalid" });
  }
}

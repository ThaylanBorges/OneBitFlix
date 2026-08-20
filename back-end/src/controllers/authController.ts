import { NextFunction, Request, Response } from "express";
import { usersServices } from "../services/userServices.js";
import { jwtService } from "../services/jwtService.js";
import { env } from "../config/env.js";
import { Login, Register } from "../schemas/authSchema.js";
import { AppError } from "../errors/AppError.js";

type payloadJWT = {
  id: number;
  firstName: string;
  email: string;
};

function setCookie(res: Response, payload: payloadJWT) {
  const token = jwtService.signToken(payload, "7d");

  res.cookie("token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
}

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, phone, birth, email, password } =
      req.dataBody as Register;

    try {
      const userAlreadyExists = await usersServices.findByEmail(email);

      if (userAlreadyExists) throw new AppError("Failed To Register User", 409);

      const user = await usersServices.create({
        firstName,
        lastName,
        birth,
        phone,
        email,
        password,
        role: "user",
      });

      setCookie(res, {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
      });

      return res.status(201).json({
        authenticated: true,
        user: { id: user.id, firstName: user.firstName, email: user.email },
      });
    } catch (err) {
      next(err);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.dataBody as Login;

    try {
      const user = await usersServices.findByEmail(email);

      if (!user) throw new AppError("Incorrect email or password", 401);

      const verifyPassword = await user.checkPassword(password);

      if (!verifyPassword)
        throw new AppError("Incorrect email or password", 401);

      setCookie(res, {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
      });

      return res.status(200).json({
        authenticated: true,
        user: { id: user.id, firstName: user.firstName, email: user.email },
      });
    } catch (err) {
      next(err);
    }
  },

  logout: async (req: Request, res: Response) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });
    res.status(204).send();
  },
};

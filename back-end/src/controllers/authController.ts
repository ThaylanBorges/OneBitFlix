import { NextFunction, Request, Response } from "express";
import { usersServices } from "../services/userService.js";
import { jwtService } from "../services/jwtService.js";
import { env } from "../config/env.js";
import { Login, Register } from "../schemas/authSchema.js";
import { AppError } from "../errors/AppError.js";
import { SessionPayload } from "../@types/express/index.js";
import { DUMMY_HASH } from "../constants/dummy-hash.js";
import bcrypt from "bcrypt";

function setCookie(res: Response, payload: SessionPayload) {
  const token = jwtService.signSessionToken(payload, "7d");

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
        kind: "session",
        id: user.id,
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

      const hashToCompare = user ? user.password : DUMMY_HASH;
      const passwordMatches = await bcrypt.compare(password, hashToCompare);

      if (!user || !passwordMatches)
        throw new AppError("Incorrect email or password", 401);

      setCookie(res, {
        kind: "session",
        id: user.id,
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

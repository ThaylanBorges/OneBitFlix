import { Request, Response } from "express";
import { usersServices } from "../services/userServices.js";
import { jwtService } from "../services/jwtService.js";
import { env } from "../config/env.js";

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
  register: async (req: Request, res: Response) => {
    const { firstName, lastName, phone, birth, email, password } = req.body;

    try {
      const userAlreadyExists = await usersServices.findByEmail(email);

      if (userAlreadyExists) throw new Error("Failed to register user.");

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
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal error",
      });
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await usersServices.findByEmail(email);

      if (!user) throw new Error("Incorrect email or password");

      const verifyPassword = await user.checkPassword(password);

      if (!verifyPassword) throw new Error("Incorrect email or password");

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
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal error",
      });
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

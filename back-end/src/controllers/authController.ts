import { Request, Response } from "express";
import { usersServices } from "../services/usersServices.js";
import { jwtService } from "../services/jwtService.js";

export const authController = {
  register: async (req: Request, res: Response) => {
    const { firstName, lastName, phone, birth, email, password } = req.body;

    try {
      const userAlreadyExists = await usersServices.findByEmail(email);

      if (userAlreadyExists) throw new Error("This e-mail is already in use.");

      const user = await usersServices.create({
        firstName,
        lastName,
        birth,
        phone,
        email,
        password,
        role: "user",
      });

      return res.status(201).json(user);
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

      const payload = {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
      };

      const token = jwtService.signToken(payload, "7d");

      return res.status(200).json({ authenticated: true, token });
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal error",
      });
    }
  },
};

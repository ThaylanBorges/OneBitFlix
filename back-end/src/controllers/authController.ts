import { NextFunction, Request, Response } from "express";
import { usersServices } from "../services/userService.js";
import { jwtService } from "../services/jwtService.js";
import { Login, Register } from "../schemas/authSchema.js";
import { AppError } from "../errors/AppError.js";
import { DUMMY_HASH } from "../constants/dummy-hash.js";
import bcrypt from "bcrypt";

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

      const token = jwtService.signSessionToken(
        {
          kind: "session",
          id: user.id,
        },
        "7d",
      );

      return res.status(201).json({
        authenticated: true,
        token,
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

      const token = jwtService.signSessionToken(
        {
          kind: "session",
          id: user.id,
        },
        "7d",
      );

      return res.status(200).json({
        authenticated: true,
        token,
        user: { id: user.id, firstName: user.firstName, email: user.email },
      });
    } catch (err) {
      next(err);
    }
  },
};

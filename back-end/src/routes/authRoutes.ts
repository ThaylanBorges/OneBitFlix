import { Router } from "express";
import { validateBody } from "../middlewares/validate.js";
import { LoginSchema, RegisterSchema } from "../schemas/authSchema.js";
import { authController } from "../controllers/authController.js";

export const authRoute = Router();

authRoute.post(
  "/register",
  validateBody(RegisterSchema),
  authController.register,
);
authRoute.post("/login", validateBody(LoginSchema), authController.login);

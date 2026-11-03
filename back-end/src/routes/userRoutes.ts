import { Router } from "express";
import { usersController } from "../controllers/usersController.js";
import { validateBody, validateParams } from "../middlewares/validate.js";
import { ParamsIdSchema } from "../schemas/commonSchemas.js";
import {
  UpdatePasswordSchema,
  UpdateUserSchema,
} from "../schemas/userSchema.js";

export const userRoute = Router();

userRoute.get("/current/watching", usersController.watching);
userRoute.get(
  "/current/watching/course/:id",
  validateParams(ParamsIdSchema),
  usersController.watchByCourse,
);
userRoute.get("/current", usersController.show);
userRoute.put(
  "/current",
  validateBody(UpdateUserSchema),
  usersController.update,
);
userRoute.put(
  "/current/password",
  validateBody(UpdatePasswordSchema),
  usersController.updatePassword,
);

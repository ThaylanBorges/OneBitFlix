import { Router } from "express";
import { validateParams } from "../middlewares/validate.js";
import { ParamsIdSchema } from "../schemas/commonSchemas.js";
import { likesController } from "../controllers/likesController.js";

export const likeRoute = Router();

likeRoute.post("/:id", validateParams(ParamsIdSchema), likesController.save);
likeRoute.delete(
  "/:id",
  validateParams(ParamsIdSchema),
  likesController.delete,
);

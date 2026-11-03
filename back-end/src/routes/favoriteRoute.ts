import { Router } from "express";
import { favoritesController } from "../controllers/favoritesController.js";
import { validateParams } from "../middlewares/validate.js";
import { ParamsIdSchema } from "../schemas/commonSchemas.js";

export const favoriteRoute = Router();

favoriteRoute.get("/", favoritesController.index);
favoriteRoute.post(
  "/:id",
  validateParams(ParamsIdSchema),
  favoritesController.save,
);
favoriteRoute.delete(
  "/:id",
  validateParams(ParamsIdSchema),
  favoritesController.delete,
);

import { Router } from "express";
import { validateParams, validateQuery } from "../middlewares/validate.js";
import { PaginationSchema, ParamsIdSchema } from "../schemas/commonSchemas.js";
import { categoryController } from "../controllers/categoriesController.js";

export const categoryRoute = Router();

categoryRoute.get(
  "/",
  validateQuery(PaginationSchema),
  categoryController.index,
);

categoryRoute.get(
  "/:id/courses",
  validateParams(ParamsIdSchema),
  categoryController.categoryWithCourses,
);

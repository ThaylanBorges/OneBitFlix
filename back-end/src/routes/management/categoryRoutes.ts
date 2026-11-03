import { Router } from "express";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../../middlewares/validate.js";
import {
  PaginationSchema,
  ParamsIdSchema,
} from "../../schemas/commonSchemas.js";
import { CategoryInputSchema } from "../../schemas/categorySchema.js";
import { categoriesController } from "../../controllers/management/categoriesController.js";

export const categoryRoute = Router();

categoryRoute.get(
  "/",
  validateQuery(PaginationSchema),
  categoriesController.index,
);

categoryRoute.post(
  "/",
  validateBody(CategoryInputSchema),
  categoriesController.create,
);

categoryRoute.get(
  "/:id",
  validateParams(ParamsIdSchema),
  categoriesController.show,
);

categoryRoute.put(
  "/:id",
  validateParams(ParamsIdSchema),
  validateBody(CategoryInputSchema),
  categoriesController.edit,
);

categoryRoute.delete(
  "/:id",
  validateParams(ParamsIdSchema),
  categoriesController.delete,
);

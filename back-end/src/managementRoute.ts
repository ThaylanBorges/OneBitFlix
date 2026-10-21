import { Router } from "express";
import { validateQuery } from "./middlewares/validate.js";
import { PaginationSchema } from "./schemas/commonSchemas.js";
import { categoryController } from "./controllers/categoryController.js";

const managementRoute = Router();

managementRoute.get(
  "/categories",
  validateQuery(PaginationSchema),
  categoryController.index,
);

export default managementRoute;

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { coursesController } from "../controllers/coursesController.js";
import { validateParams, validateQuery } from "../middlewares/validate.js";
import { CourseSearchSchema } from "../schemas/courseSchema.js";
import { ParamsIdSchema } from "../schemas/commonSchemas.js";

export const courseRoutes = Router();

courseRoutes.get("/featured", authMiddleware, coursesController.featured);
courseRoutes.get("/newest", coursesController.newest);
courseRoutes.get("/popular", coursesController.popular);
courseRoutes.get(
  "/search",
  authMiddleware,
  validateQuery(CourseSearchSchema),
  coursesController.search,
);
courseRoutes.get(
  "/:id",
  authMiddleware,
  validateParams(ParamsIdSchema),
  coursesController.show,
);

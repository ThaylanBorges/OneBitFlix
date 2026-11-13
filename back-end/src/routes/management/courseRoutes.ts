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
import {
  CourseInputSchema,
  CourseUpdateSchema,
  UploadThumbnaiSchema,
} from "../../schemas/courseSchema.js";
import { courseController } from "../../controllers/management/courseController.js";

export const courseRoute = Router();

courseRoute.get("/", validateQuery(PaginationSchema), courseController.index);

courseRoute.post("/", validateBody(CourseInputSchema), courseController.create);

courseRoute.post(
  "/:id/thumbnail",
  validateParams(ParamsIdSchema),
  validateBody(UploadThumbnaiSchema),
  courseController.createThumbnail,
);

courseRoute.get("/:id", validateParams(ParamsIdSchema), courseController.show);

courseRoute.patch(
  "/:id",
  validateParams(ParamsIdSchema),
  validateBody(CourseUpdateSchema),
  courseController.edit,
);

courseRoute.delete(
  "/:id",
  validateParams(ParamsIdSchema),
  courseController.delete,
);

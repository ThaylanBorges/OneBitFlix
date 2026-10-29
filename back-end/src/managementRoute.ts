import { Router } from "express";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "./middlewares/validate.js";
import { PaginationSchema, ParamsIdSchema } from "./schemas/commonSchemas.js";
import { categoryController } from "./controllers/categoryController.js";
import {
  CategoryInputSchema,
  CategorySchema,
} from "./schemas/categorySchema.js";
import { courseManagementController } from "./controllers/coursesManagementController.js";
import {
  CourseInputSchema,
  CourseUpdateSchema,
  UploadThumbnaiSchema,
} from "./schemas/courseSchema.js";
import { episodesController } from "./controllers/episodesController.js";
import {
  EpisodeInputSchema,
  EpisodeUpdateSchema,
  PaginationEpisodeSchema,
  UploadVideoSchema,
} from "./schemas/episodeSchema.js";

const managementRoute = Router();

managementRoute.get(
  "/categories",
  validateQuery(PaginationSchema),
  categoryController.index,
);

managementRoute.post(
  "/categories",
  validateBody(CategoryInputSchema),
  categoryController.create,
);

managementRoute.get(
  "/categories/:id",
  validateParams(ParamsIdSchema),
  categoryController.show,
);

managementRoute.put(
  "/categories/:id",
  validateParams(ParamsIdSchema),
  validateBody(CategoryInputSchema),
  categoryController.edit,
);

managementRoute.delete(
  "/categories/:id",
  validateParams(ParamsIdSchema),
  categoryController.delete,
);

managementRoute.get(
  "/courses",
  validateQuery(PaginationSchema),
  courseManagementController.index,
);

managementRoute.post(
  "/courses",
  validateBody(CourseInputSchema),
  courseManagementController.create,
);

managementRoute.post(
  "/courses/:id/thumbnai-upload",
  validateParams(ParamsIdSchema),
  validateBody(UploadThumbnaiSchema),
  courseManagementController.createThumbnail,
);

managementRoute.get(
  "/courses/:id",
  validateParams(ParamsIdSchema),
  courseManagementController.show,
);

managementRoute.patch(
  "/courses/:id",
  validateParams(ParamsIdSchema),
  validateBody(CourseUpdateSchema),
  courseManagementController.edit,
);

managementRoute.delete(
  "/courses/:id",
  validateParams(ParamsIdSchema),
  courseManagementController.delete,
);

managementRoute.get(
  "/episodes",
  validateQuery(PaginationEpisodeSchema),
  episodesController.index,
);

managementRoute.get(
  "/episodes/:id",
  validateParams(ParamsIdSchema),
  episodesController.show,
);

managementRoute.post(
  "/episodes",
  validateBody(EpisodeInputSchema),
  episodesController.create,
);

managementRoute.patch(
  "/episodes/:id",
  validateParams(ParamsIdSchema),
  validateBody(EpisodeUpdateSchema),
  episodesController.edit,
);

managementRoute.delete(
  "/episodes/:id",
  validateParams(ParamsIdSchema),
  episodesController.delete,
);

managementRoute.post(
  "/episodes/:id/video-upload",
  validateParams(ParamsIdSchema),
  validateBody(UploadVideoSchema),
  episodesController.createVideo,
);

export default managementRoute;

import { Router } from "express";
import { validateBody, validateParams } from "../middlewares/validate.js";
import { ParamsIdSchema } from "../schemas/commonSchemas.js";
import { episodesController } from "../controllers/episodesController.js";
import { WatchTimeSchema } from "../schemas/watchTimeSchema.js";

export const episodeRoutes = Router();

episodeRoutes.get(
  "/:id/video",
  validateParams(ParamsIdSchema),
  episodesController.video,
);
episodeRoutes.get(
  "/:id/watchTime",
  validateParams(ParamsIdSchema),
  episodesController.getWatchTime,
);
episodeRoutes.post(
  "/:id/watchTime",
  validateParams(ParamsIdSchema),
  validateBody(WatchTimeSchema),
  episodesController.setWatchTime,
);
episodeRoutes.post(
  "/:id/complete",
  validateParams(ParamsIdSchema),
  episodesController.setCompleted,
);
episodeRoutes.delete(
  "/:id/complete",
  validateParams(ParamsIdSchema),
  episodesController.removeCompleted,
);

import { Router } from "express";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../../middlewares/validate.js";
import {
  EpisodeInputSchema,
  EpisodeUpdateSchema,
  PaginationEpisodeSchema,
  UploadVideoSchema,
} from "../../schemas/episodeSchema.js";
import { ParamsIdSchema } from "../../schemas/commonSchemas.js";
import { episodesController } from "../../controllers/management/episodesController.js";

export const episodeRoute = Router();

episodeRoute.get(
  "/",
  validateQuery(PaginationEpisodeSchema),
  episodesController.index,
);

episodeRoute.get(
  "/:id",
  validateParams(ParamsIdSchema),
  episodesController.show,
);

episodeRoute.post(
  "/",
  validateBody(EpisodeInputSchema),
  episodesController.create,
);

episodeRoute.patch(
  "/:id",
  validateParams(ParamsIdSchema),
  validateBody(EpisodeUpdateSchema),
  episodesController.edit,
);

episodeRoute.delete(
  "/:id",
  validateParams(ParamsIdSchema),
  episodesController.delete,
);

episodeRoute.post(
  "/:id/video-upload",
  validateParams(ParamsIdSchema),
  validateBody(UploadVideoSchema),
  episodesController.createVideo,
);

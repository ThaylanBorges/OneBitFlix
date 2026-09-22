import { NextFunction, Request, Response } from "express";
import { episodeService } from "../services/episodeService.js";
import { Seconds } from "../schemas/episodeSchema.js";
import { AppError } from "../errors/AppError.js";
import { ParamsId } from "../schemas/commonSchemas.js";

export const episodesController = {
  stream: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.dataParams as ParamsId;

    try {
      const episode = await episodeService.findById(id);

      if (!episode) throw new AppError("Episode not found.", 404);

      await episodeService.streamEpisodeToResponse(
        episode.videoUrl,
        res,
        req.headers.range,
      );
    } catch (err) {
      next(err);
    }
  },

  getWatchTime: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;
    const { id: episodeId } = req.dataParams as ParamsId;

    try {
      const watchTime = await episodeService.getWatchTime(userId, episodeId);
      res.json(watchTime);
    } catch (err) {
      next(err);
    }
  },

  setWatchTime: async (req: Request, res: Response, next: NextFunction) => {
    const { id: episodeId } = req.dataParams as ParamsId;
    const { seconds } = req.dataBody as Seconds;
    const userId = req.user?.id;

    try {
      const watchTime = await episodeService.setWatchTime(
        userId,
        episodeId,
        seconds,
      );

      res.json(watchTime);
    } catch (err) {
      next(err);
    }
  },
};

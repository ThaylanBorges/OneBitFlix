import { NextFunction, Request, Response } from "express";
import { episodeService } from "../services/episodeService.js";
import { Seconds, VideoUrl } from "../schemas/episodeSchema.js";
import { ParmasId } from "../schemas/commonSchemas.js";

export const episodesController = {
  stream: async (req: Request, res: Response, next: NextFunction) => {
    const { videoUrl } = req.dataQuery as VideoUrl;

    try {
      const range = req.headers.range;

      await episodeService.streamEpisodeToResponse(videoUrl, res, range);
    } catch (err) {
      next(err);
    }
  },

  getWatchTime: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;
    const { id: episodeId } = req.dataParams as ParmasId;

    try {
      const watchTime = await episodeService.getWatchTime(userId, episodeId);
      res.json(watchTime);
    } catch (err) {
      next(err);
    }
  },

  setWatchTime: async (req: Request, res: Response, next: NextFunction) => {
    const { id: episodeId } = req.dataParams as ParmasId;
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

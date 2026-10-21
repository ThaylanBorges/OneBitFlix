import { NextFunction, Request, Response } from "express";
import { episodeService } from "../services/episodeService.js";
import { Seconds } from "../schemas/episodeSchema.js";
import { AppError } from "../errors/AppError.js";
import { ParamsId } from "../schemas/commonSchemas.js";
import { storageService } from "../services/storageService.js";

export const episodesController = {
  video: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.dataParams as ParamsId;

      const episode = await episodeService.findById(id);

      if (!episode?.videoUrl) throw new AppError("Episode not found", 404);

      const expiresIn = (episode.secondsLong ?? 0) + 3600;

      const url = await storageService.getVideoUrl(episode.videoUrl, expiresIn);

      res.json({ url });
    } catch (err) {
      next(err);
    }
  },

  getWatchTime: async (req: Request, res: Response, next: NextFunction) => {
    const { id: episodeId } = req.dataParams as ParamsId;

    try {
      const watchTime = await episodeService.getWatchTime(
        req.user!.id,
        episodeId,
      );
      res.json(watchTime);
    } catch (err) {
      next(err);
    }
  },

  setWatchTime: async (req: Request, res: Response, next: NextFunction) => {
    const { id: episodeId } = req.dataParams as ParamsId;
    const { seconds } = req.dataBody as Seconds;

    try {
      const watchTime = await episodeService.setWatchTime(
        req.user!.id,
        episodeId,
        seconds,
      );

      res.json(watchTime[0]);
    } catch (err) {
      next(err);
    }
  },

  setCompleted: async (req: Request, res: Response, next: NextFunction) => {
    const { id: episodeId } = req.dataParams as ParamsId;

    try {
      const completeEpisode = await episodeService.setCompleted(
        req.user!.id,
        episodeId,
      );

      res.json(completeEpisode[0]);
    } catch (err) {
      next(err);
    }
  },

  removeCompleted: async (req: Request, res: Response, next: NextFunction) => {
    const { id: episodeId } = req.dataParams as ParamsId;

    try {
      await episodeService.removeCompleted(req.user!.id, episodeId);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

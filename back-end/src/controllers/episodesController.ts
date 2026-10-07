import { NextFunction, Request, Response } from "express";
import { episodeService } from "../services/episodeService.js";
import { Seconds } from "../schemas/episodeSchema.js";
import { AppError } from "../errors/AppError.js";
import { ParamsId } from "../schemas/commonSchemas.js";
import { jwtService } from "../services/jwtService.js";

export const episodesController = {
  getTokenStream: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.dataParams as ParamsId;

    try {
      const episode = await episodeService.findById(id);

      if (!episode) throw new AppError("Episode not found.", 404);

      const token = jwtService.signStreamToken(
        { kind: "stream", episodeId: id, userId: req.user!.id },
        episode.secondsLong ?? 0,
      );

      res.status(200).json(token);
    } catch (err) {
      next(err);
    }
  },

  stream: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.dataParams as ParamsId;

    const streamPayload = req.stream;

    if (!streamPayload || streamPayload.episodeId !== id)
      return next(new AppError("Unauthorized", 401));

    try {
      const episode = await episodeService.findById(streamPayload.episodeId);

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
    const { seconds } = req.dataBody as Seconds;

    try {
      const completeEpisode = await episodeService.setCompleted(
        req.user!.id,
        episodeId,
        seconds,
      );

      res.json(completeEpisode[0]);
    } catch (err) {
      next(err);
    }
  },
};

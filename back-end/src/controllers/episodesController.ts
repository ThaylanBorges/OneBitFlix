import { Request, Response } from "express";
import { episodeService } from "../services/episodeService.js";
import { Seconds, VideoUrl } from "../schemas/episodeSchema.js";
import { ParmasId } from "../schemas/commonSchemas.js";

export const episodesController = {
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.dataQuery as VideoUrl;

    try {
      const range = req.headers.range;

      await episodeService.streamEpisodeToResponse(videoUrl, res, range);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal Error",
      });
    }
  },

  getWatchTime: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id: episodeId } = req.dataParams as ParmasId;

    try {
      const watchTime = await episodeService.getWatchTime(userId, episodeId);
      res.json(watchTime);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal Error",
      });
    }
  },

  setWatchTime: async (req: Request, res: Response) => {
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
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal Error",
      });
    }
  },
};

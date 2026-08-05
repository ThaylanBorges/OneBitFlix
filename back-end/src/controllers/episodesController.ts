import { Request, Response } from "express";
import { episodeService } from "../services/episodeService.js";

export const episodesController = {
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.query;

    try {
      if (typeof videoUrl !== "string")
        throw new Error("videoUrl param must be of type string");

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
    const { id } = req.params;

    try {
      const watchTime = await episodeService.getWatchTime(userId, Number(id));
      res.json(watchTime);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal Error",
      });
    }
  },

  setWatchTime: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;
    const { seconds } = req.body;

    try {
      const watchTime = await episodeService.setWatchTime(
        userId,
        Number(id),
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

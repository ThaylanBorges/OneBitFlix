import { NextFunction, Request, Response } from "express";
import { episodeService } from "../../services/episodeService.js";
import {
  EpisodeInput,
  EpisodeUpdate,
  PaginationEpisode,
  UploadVideo,
} from "../../schemas/episodeSchema.js";
import { ParamsId } from "../../schemas/commonSchemas.js";
import { AppError } from "../../errors/AppError.js";
import { courseServices } from "../../services/courseService.js";
import { storageService } from "../../services/storageService.js";
import { env } from "../../config/env.js";
import { randomUUID } from "crypto";

export const episodesController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    const { page, perPage, courseId } = req.dataQuery as PaginationEpisode;

    try {
      const episodes = await episodeService.findAll(page, perPage, courseId);
      res.json(episodes);
    } catch (err) {
      next(err);
    }
  },

  show: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.dataParams as ParamsId;

    try {
      const episode = await episodeService.findById(id);

      if (!episode) throw new AppError("Not found", 404);

      res.json(episode);
    } catch (err) {
      next(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const data = req.dataBody as EpisodeInput;

    try {
      const course = await courseServices.findById(data.courseId);

      if (!course) throw new AppError("Invalid Course", 400);

      const verifyOrder = await episodeService.verifyOrder(
        data.courseId,
        data.order,
      );

      if (verifyOrder)
        throw new AppError("Episode order is already in use", 409);

      const episode = await episodeService.create(data);

      res.status(201).json(episode);
    } catch (err) {
      next(err);
    }
  },

  edit: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.dataParams as ParamsId;
    const data = req.dataBody as EpisodeUpdate;

    try {
      const episode = await episodeService.findById(id);

      if (!episode) throw new AppError("Not found", 404);

      if (data.order && data.order !== episode.order) {
        const verifyOrder = await episodeService.verifyOrder(
          episode.courseId,
          data.order,
        );

        if (verifyOrder)
          throw new AppError("Episode order is already in use", 409);
      }

      await episode.update(data);

      res.json(episode);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.dataParams as ParamsId;

    try {
      const episode = await episodeService.findById(id);

      if (!episode) throw new AppError("Not found", 404);

      await episode.destroy();

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  createVideo: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.dataParams as ParamsId;
    const { contentType } = req.dataBody as UploadVideo;

    try {
      const episode = await episodeService.findById(id);

      if (!episode) throw new AppError("Not found", 404);

      const key = `videos/course-${episode.courseId}/episodes-${episode.id}-${randomUUID()}.mp4`;

      const uploadUrl = await storageService.getUploadUrl(
        env.R2_VIDEO_BUCKET,
        key,
        1800,
        contentType,
      );
      res.json({ uploadUrl, key });
    } catch (err) {
      next(err);
    }
  },
};

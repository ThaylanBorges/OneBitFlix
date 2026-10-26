import { NextFunction, Request, Response } from "express";
import { likeService } from "../services/likeService.js";
import { ParamsId } from "../schemas/commonSchemas.js";
import { courseServices } from "../services/courseService.js";
import { AppError } from "../errors/AppError.js";

export const likesController = {
  save: async (req: Request, res: Response, next: NextFunction) => {
    const { id: courseId } = req.dataParams as ParamsId;

    try {
      const course = await courseServices.findById(courseId);

      if (!course) throw new AppError("Not found", 404);

      const like = await likeService.create(req.user!.id, courseId);

      if (!like) return res.status(200).send();

      res.status(201).json(like);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { id: courseId } = req.dataParams as ParamsId;

    try {
      const course = await courseServices.findById(courseId);

      if (!course) throw new AppError("Not found", 404);

      await likeService.delete(req.user!.id, courseId);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },
};

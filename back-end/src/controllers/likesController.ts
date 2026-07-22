import { Request, Response } from "express";
import { likesService } from "../services/likesServices.js";

export const likesController = {
  save: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { courseId } = req.body;

    try {
      const like = await likesService.create(userId, courseId);
      res.status(201).json(like);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal Error",
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { courseId } = req.params;

    try {
      await likesService.delete(userId, Number(courseId));
      res.status(200).send();
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal Error",
      });
    }
  },
};

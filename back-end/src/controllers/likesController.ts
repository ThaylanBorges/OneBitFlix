import { Request, Response } from "express";
import { likeService } from "../services/likeServices.js";
import { ParmasId } from "../schemas/commonSchemas.js";

export const likesController = {
  save: async (req: Request, res: Response) => {
    const { id: courseId } = req.dataQuery as ParmasId;
    const userId = req.user!.id;

    try {
      const like = await likeService.create(userId, courseId);
      res.status(201).json(like);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal Error",
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id: courseId } = req.dataParams as ParmasId;

    try {
      await likeService.delete(userId, courseId);
      res.status(200).send();
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal Error",
      });
    }
  },
};

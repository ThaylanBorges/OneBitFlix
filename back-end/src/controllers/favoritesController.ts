import { Request, Response } from "express";
import { favoritesService } from "../services/favoritesService.js";

export const favoritesController = {
  save: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { courseId } = req.body;

    try {
      const favorite = await favoritesService.create(userId, courseId);
      res.status(201).json(favorite);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal Error",
      });
    }
  },

  index: async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;

      const favorites = await favoritesService.findByUserId(userId);
      res.json(favorites);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal Error",
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;
      const { courseId } = req.params;

      await favoritesService.delete(userId, Number(courseId));
      res.status(200).send();
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal Error",
      });
    }
  },
};

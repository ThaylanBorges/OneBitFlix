import { Request, Response } from "express";
import { favoriteService } from "../services/favoriteService.js";
import { ParmasId } from "../schemas/commonSchemas.js";

export const favoritesController = {
  save: async (req: Request, res: Response) => {
    const { id: courseId } = req.dataParams as ParmasId;
    const userId = req.user!.id;

    try {
      const favorite = await favoriteService.create(userId, courseId);
      res.status(201).json(favorite);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal Error",
      });
    }
  },

  index: async (req: Request, res: Response) => {
    const userId = req.user!.id;

    try {
      const favorites = await favoriteService.findByUserId(userId);
      res.json(favorites);
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
      await favoriteService.delete(userId, courseId);
      res.status(200).send();
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal Error",
      });
    }
  },
};

import { NextFunction, Request, Response } from "express";
import { favoriteService } from "../services/favoriteService.js";
import { ParmasId } from "../schemas/commonSchemas.js";

export const favoritesController = {
  save: async (req: Request, res: Response, next: NextFunction) => {
    const { id: courseId } = req.dataParams as ParmasId;
    const userId = req.user!.id;

    try {
      const favorite = await favoriteService.create(userId, courseId);
      res.status(201).json(favorite);
    } catch (err) {
      next(err);
    }
  },

  index: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;

    try {
      const favorites = await favoriteService.findByUserId(userId);
      res.json(favorites);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;
    const { id: courseId } = req.dataParams as ParmasId;

    try {
      await favoriteService.delete(userId, courseId);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },
};

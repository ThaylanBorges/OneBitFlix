import { NextFunction, Request, Response } from "express";
import { favoriteService } from "../services/favoriteService.js";
import { ParamsId } from "../schemas/commonSchemas.js";

export const favoritesController = {
  save: async (req: Request, res: Response, next: NextFunction) => {
    const { id: courseId } = req.dataParams as ParamsId;

    try {
      const favorite = await favoriteService.create(req.user!.id, courseId);

      if (!favorite) return res.status(200).send();

      res.status(201).json(favorite);
    } catch (err) {
      next(err);
    }
  },

  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const favorites = await favoriteService.findByUserId(req.user!.id);
      res.json(favorites);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { id: courseId } = req.dataParams as ParamsId;

    try {
      await favoriteService.delete(req.user!.id, courseId);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },
};

import { NextFunction, Request, Response } from "express";
import { usersServices } from "../services/userServices.js";
import { UpdatePassword, UpdateUser } from "../schemas/userSchema.js";

export const usersController = {
  watching: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;

    try {
      const watchingList = await usersServices.getKeepWatchingList(userId);
      res.json(watchingList);
    } catch (err) {
      next(err);
    }
  },

  show: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;

    try {
      const user = await usersServices.findById(userId);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;
    const attributes = req.dataBody as UpdateUser;

    try {
      await usersServices.update(userId, attributes);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },

  updatePassword: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;
    const { currentPassword, newPassword } = req.dataBody as UpdatePassword;

    try {
      await usersServices.updatePassword(userId, currentPassword, newPassword);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },
};

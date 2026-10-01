import { NextFunction, Request, Response } from "express";
import { usersServices } from "../services/userService.js";
import { UpdatePassword, UpdateUser } from "../schemas/userSchema.js";

export const usersController = {
  watching: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const watchingList = await usersServices.getKeepWatchingList(
        req.user!.id,
      );
      res.json(watchingList);
    } catch (err) {
      next(err);
    }
  },

  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await usersServices.findById(req.user!.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const attributes = req.dataBody as UpdateUser;

    try {
      await usersServices.update(req.user!.id, attributes);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },

  updatePassword: async (req: Request, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword } = req.dataBody as UpdatePassword;

    try {
      await usersServices.updatePassword(
        req.user!.id,
        currentPassword,
        newPassword,
      );
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },
};

import { Request, Response } from "express";
import { usersServices } from "../services/usersServices.js";

export const usersController = {
  watching: async (req: Request, res: Response) => {
    const userId = req.user!.id;

    try {
      const watchingList = await usersServices.getKeepWatchingList(userId);

      res.json(watchingList);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal Error",
      });
    }
  },

  show: async (req: Request, res: Response) => {
    const userId = req.user!.id;

    try {
      const user = await usersServices.findById(userId);
      res.json(user);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal Error",
      });
    }
  },

  update: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { firstName, lastName, phone, birth, email } = req.body;

    try {
      await usersServices.update(userId, {
        firstName,
        lastName,
        phone,
        birth,
        email,
      });
      res.status(200).send();
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal Error",
      });
    }
  },

  updatePassword: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { currentPassword, newPassword } = req.body;

    try {
      await usersServices.updatePassword(userId, currentPassword, newPassword);
      res.status(200).send();
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal Error",
      });
    }
  },
};

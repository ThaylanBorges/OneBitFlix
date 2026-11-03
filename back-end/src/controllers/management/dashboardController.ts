import { NextFunction, Request, Response } from "express";
import { dashboardService } from "../../services/dashboardService.js";

export const dashboardController = {
  dashboard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await dashboardService.dashboard();
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};

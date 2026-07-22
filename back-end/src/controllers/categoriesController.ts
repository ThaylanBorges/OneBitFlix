import { Request, Response } from "express";
import { categoriesService } from "../services/categoriesService.js";
import { getPaginationParams } from "../helpers/getPaginationParams.js";

export const categoriesController = {
  index: async (req: Request, res: Response) => {
    const [page, perPage] = getPaginationParams(req);

    try {
      const paginatedCategories = await categoriesService.findAllPaginated(
        page,
        perPage,
      );

      return res.json(paginatedCategories);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal error",
      });
    }
  },

  show: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const category = await categoriesService.findByIdWithCourses(Number(id));
      res.json(category);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal error",
      });
    }
  },
};

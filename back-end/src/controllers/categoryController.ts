import { Request, Response } from "express";
import { categoryService } from "../services/categoryService.js";
import { getPaginationParams } from "../helpers/getPaginationParams.js";

export const categoryController = {
  index: async (req: Request, res: Response) => {
    const [page, perPage] = getPaginationParams(req);

    try {
      const paginatedCategories = await categoryService.findAllPaginated(
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
      const category = await categoryService.findByIdWithCourses(Number(id));
      res.json(category);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal error",
      });
    }
  },
};

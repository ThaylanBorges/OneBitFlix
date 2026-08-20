import { NextFunction, Request, Response } from "express";
import { categoryService } from "../services/categoryService.js";
import { Pagination, ParmasId } from "../schemas/commonSchemas.js";

export const categoryController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    const { page, perPage } = req.dataQuery as Pagination;

    try {
      const paginatedCategories = await categoryService.findAllPaginated(
        page,
        perPage,
      );

      return res.json(paginatedCategories);
    } catch (err) {
      next(err);
    }
  },

  show: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.dataParams as ParmasId;

    try {
      const category = await categoryService.findByIdWithCourses(id);
      res.json(category);
    } catch (err) {
      next(err);
    }
  },
};

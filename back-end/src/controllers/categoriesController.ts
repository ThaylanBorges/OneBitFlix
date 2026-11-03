import { NextFunction, Request, Response } from "express";
import { Pagination, ParamsId } from "../schemas/commonSchemas.js";
import { AppError } from "../errors/AppError.js";
import { CategoryInputType } from "../schemas/categorySchema.js";
import { categoryService } from "../services/categoryService.js";

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

  categoryWithCourses: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.dataParams as ParamsId;

    try {
      const category = await categoryService.findByIdWithCourses(id);

      if (!category) throw new AppError("Category not found.", 404);

      res.json(category);
    } catch (err) {
      next(err);
    }
  },
};

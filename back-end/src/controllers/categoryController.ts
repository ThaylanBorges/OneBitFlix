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

  create: async (req: Request, res: Response, next: NextFunction) => {
    const { name, position } = req.dataBody as CategoryInputType;

    try {
      const category = await categoryService.create(name, position);
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  },

  show: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.dataParams as ParamsId;

    try {
      const category = await categoryService.findById(id);

      if (!category) throw new AppError("Not found", 404);

      res.json(category);
    } catch (err) {
      next(err);
    }
  },

  edit: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.dataParams as ParamsId;
    const data = req.dataBody as CategoryInputType;

    try {
      const category = await categoryService.findById(id);

      if (!category) throw new AppError("Not found", 404);

      await category.update(data);

      res.json(category);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.dataParams as ParamsId;

    try {
      const category = await categoryService.findByIdWithCourses(id);

      if (!category) throw new AppError("Not found", 404);

      if (category.courses.length !== 0)
        throw new AppError("Category has courses", 409);

      await categoryService.delete(id);

      res.status(204).send();
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

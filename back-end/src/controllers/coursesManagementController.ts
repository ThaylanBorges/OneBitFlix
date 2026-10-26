import { NextFunction, Request, Response } from "express";
import { Pagination, ParamsId } from "../schemas/commonSchemas.js";
import { courseServices } from "../services/courseService.js";
import { AppError } from "../errors/AppError.js";
import { CourseInput, CourseUpdate } from "../schemas/courseSchema.js";
import { categoryService } from "../services/categoryService.js";

export const courseManagementController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    const { page, perPage } = req.dataQuery as Pagination;

    try {
      const courses = await courseServices.findAll(page, perPage);
      res.json(courses);
    } catch (err) {
      next(err);
    }
  },

  show: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.dataParams as ParamsId;

    try {
      const course = await courseServices.findById(id);

      if (!course) throw new AppError("Not found", 404);

      res.json(course);
    } catch (err) {
      next(err);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const data = req.dataBody as CourseInput;

    try {
      const category = await categoryService.findById(data.categoryId);

      if (!category) throw new AppError("Invalid category", 400);

      const course = await courseServices.create(data);
      res.status(201).json(course);
    } catch (err) {
      next(err);
    }
  },

  edit: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.dataParams as ParamsId;
    const data = req.dataBody as CourseUpdate;

    try {
      if (data.categoryId) {
        const category = await categoryService.findById(data.categoryId);

        if (!category) throw new AppError("Invalid category");
      }

      const course = await courseServices.findById(id);

      if (!course) throw new AppError("Not found", 404);

      await course.update(data);
      res.status(200).send(course);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.dataParams as ParamsId;

    try {
      const course = await courseServices.findById(id);

      if (!course) throw new AppError("Not found", 404);

      await courseServices.delete(id);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

import { NextFunction, Request, Response } from "express";
import { courseServices } from "../services/courseService.js";
import { likeService } from "../services/likeService.js";
import { favoriteService } from "../services/favoriteService.js";
import { ParmasId } from "../schemas/commonSchemas.js";
import { CourseSearch } from "../schemas/courseSchema.js";
import { AppError } from "../errors/AppError.js";

export const coursesController = {
  featured: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const featuredCourses = await courseServices.getRandomFeaturedCourses();
      res.json(featuredCourses);
    } catch (err) {
      next(err);
    }
  },

  show: async (req: Request, res: Response, next: NextFunction) => {
    const { id: courseId } = req.dataParams as ParmasId;
    const userId = req.user!.id;

    try {
      const course = await courseServices.findById(courseId);

      if (!course) throw new AppError("Course not found", 404);

      const liked = await likeService.isLiked(userId, courseId);

      const favorited = await favoriteService.isFavorite(userId, courseId);

      res.json({ ...course.get(), liked, favorited });
    } catch (err) {
      next(err);
    }
  },

  popular: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const topTen = await courseServices.getTopTenByLikes();
      res.status(200).json(topTen ?? []);
    } catch (err) {
      next(err);
    }
  },

  newest: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCourses = await courseServices.getTenNewCourses();
      res.json(newCourses);
    } catch (err) {
      next(err);
    }
  },

  search: async (req: Request, res: Response, next: NextFunction) => {
    const { name, page, perPage } = req.dataQuery as CourseSearch;

    try {
      const courses = await courseServices.findByName(name, page, perPage);
      res.json(courses);
    } catch (err) {
      next(err);
    }
  },
};

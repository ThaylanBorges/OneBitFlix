import { Request, Response } from "express";
import { courseServices } from "../services/courseService.js";
import { getPaginationParams } from "../helpers/getPaginationParams.js";
import { likeService } from "../services/likeServices.js";
import { favoriteService } from "../services/favoriteService.js";

export const coursesController = {
  featured: async (req: Request, res: Response) => {
    try {
      const featuredCourses = await courseServices.getRandomFeaturedCourses();
      res.json(featuredCourses);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal error",
      });
    }
  },

  show: async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    try {
      const course = await courseServices.findById(Number(id));

      if (!course) return res.status(404).json({ message: "Course not found" });

      const liked = await likeService.isLiked(userId, Number(id));

      const favorited = await favoriteService.isFavorite(userId, Number(id));

      res.json({ ...course.get(), liked, favorited });
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal error",
      });
    }
  },

  popular: async (req: Request, res: Response) => {
    try {
      const topTen = await courseServices.getTopTenByLikes();
      res.status(200).json(topTen ? topTen : []);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal error",
      });
    }
  },

  newest: async (req: Request, res: Response) => {
    try {
      const newCourses = await courseServices.getTenNewCourses();
      res.json(newCourses);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal error",
      });
    }
  },

  search: async (req: Request, res: Response) => {
    const { name } = req.query;

    const [page, perPage] = getPaginationParams(req);

    try {
      if (typeof name !== "string")
        throw new Error("name param must br of type string");

      const courses = await courseServices.findByName(
        name.toString(),
        page,
        perPage,
      );
      res.json(courses);
    } catch (err) {
      res.status(400).json({
        message: err instanceof Error ? err.message : "Internal error",
      });
    }
  },
};

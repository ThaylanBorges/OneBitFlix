import { UniqueConstraintError } from "sequelize";
import { Likes } from "../models/index.js";
import { courseServices } from "./courseService.js";

export const likeService = {
  create: async (userId: number, courseId: number) => {
    try {
      await courseServices.findOrFailByPrimaryKey(courseId);

      const like = await Likes.create({ userId, courseId });
      return like;
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return null;
      } else {
        throw err;
      }
    }
  },

  delete: async (userId: number, courseId: number) => {
    await Likes.destroy({ where: { userId, courseId } });
  },

  isLiked: async (userId: number, courseId: number) => {
    const like = await Likes.findOne({ where: { userId, courseId } });
    return like ? true : false;
  },
};

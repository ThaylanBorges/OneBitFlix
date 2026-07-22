import { Likes } from "../models/index.js";

export const likesService = {
  create: async (userId: number, courseId: number) => {
    const like = await Likes.create({ userId, courseId });
    return like;
  },

  delete: async (userId: number, courseId: number) => {
    await Likes.destroy({ where: { userId, courseId } });
  },

  isLiked: async (userId: number, courseId: number) => {
    const like = await Likes.findOne({ where: { userId, courseId } });
    return like ? true : false;
  },
};

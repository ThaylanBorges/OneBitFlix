import { UniqueConstraintError } from "sequelize";
import { Favorite, User } from "../models/index.js";

export const favoriteService = {
  create: async (userId: number, courseId: number) => {
    try {
      return await Favorite.create({ userId, courseId });
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return null;
      } else {
        throw err;
      }
    }
  },

  findByUserId: async (userId: number) => {
    const user = await User.findByPk(userId, {
      attributes: [],
      include: [
        {
          association: "favoritesCourses",
          attributes: [
            "id",
            "name",
            "synopsis",
            ["thumbnail_url", "thumbnailUrl"],
          ],
          through: { attributes: [] },
        },
      ],
    });

    return { userId, courses: user?.favoritesCourses };
  },

  delete: async (userId: number, courseId: number) => {
    await Favorite.destroy({
      where: { userId, courseId },
    });
  },
};

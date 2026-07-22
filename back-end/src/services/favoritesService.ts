import { Favorite, User } from "../models/index.js";

export const favoritesService = {
  create: async (userId: number, courseId: number) => {
    const favorite = await Favorite.create({ userId, courseId });
    return favorite;
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

  isFavorite: async (userId: number, courseId: number) => {
    const favorite = await Favorite.findOne({ where: { userId, courseId } });
    return favorite ? true : false;
  },
};

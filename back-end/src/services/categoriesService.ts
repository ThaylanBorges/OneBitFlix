import { Category } from "../models/index.js";

export const categoriesService = {
  findAllPaginated: async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await Category.findAndCountAll({
      order: [["position", "ASC"]],
      limit: perPage,
      offset,
    });

    return {
      categories: rows,
      page,
      perPage,
      total: count,
    };
  },

  findByIdWithCourses: async (id: number) => {
    const category = await Category.findByPk(id, {
      attributes: ["id", "name"],
      include: {
        association: "courses",
        attributes: [
          "id",
          "name",
          "synopsis",
          ["thumbnail_url", "thumbnailUrl"],
        ],
      },
    });
    return category;
  },
};

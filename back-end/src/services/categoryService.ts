import { Category } from "../models/index.js";

export const categoryService = {
  findAllPaginated: async (page: number, perPage: number) => {
    const { count, rows } = await Category.findAndCountAll({
      order: [["position", "ASC"]],
      limit: perPage,
      offset: (page - 1) * perPage,
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

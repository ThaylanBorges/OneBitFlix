import { Category } from "../models/Category.js";
import { CategoryWithCoursesSchema } from "../schemas/categorySchema.js";

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

  create: async (name: string, position: number) => {
    return await Category.create({ name, position });
  },

  findById: async (id: number) => {
    return await Category.findByPk(id);
  },

  delete: async (id: number) => {
    return Category.destroy({ where: { id } });
  },

  findByIdWithCourses: async (id: number) => {
    const category = await Category.findByPk(id, {
      attributes: ["id", "name", "position"],
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

    if (!category) return null;

    return CategoryWithCoursesSchema.parse(category);
  },
};

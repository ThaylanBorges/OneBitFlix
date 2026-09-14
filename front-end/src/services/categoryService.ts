import { CategoryArraySchema } from "@/schemas/categorySchema";
import { apiWithAuth } from "./apiWithAuth";
import { CoursesWithCategorySchema } from "@/schemas/courseSchema";

export const categoryService = {
  getCategories: async () => {
    try {
      const { categories } = await apiWithAuth("/categories");

      return CategoryArraySchema.parse(categories);
    } catch {
      return [];
    }
  },
  getCoursesWithCategory: async (categoryId: number) => {
    try {
      const category = await apiWithAuth(`/categories/${categoryId}`);

      return CoursesWithCategorySchema.parse(category);
    } catch {
      return null;
    }
  },
};

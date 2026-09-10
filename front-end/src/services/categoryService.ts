import { CategoryArraySchema } from "@/schemas/categorySchema";
import { apiWithAuth } from "./apiWithAuth";
import {
  CoursesWithCategory,
  CoursesWithCategorySchema,
} from "@/schemas/courseSchema";

export const categoryService = {
  getCategories: async () => {
    try {
      const { categories } = await apiWithAuth("/categories");

      return CategoryArraySchema.parse(categories);
    } catch {
      return [];
    }
  },
  getCoursesWithCategory: async (
    categoryId: number,
  ): Promise<
    { data: CoursesWithCategory; success: true } | { success: false }
  > => {
    try {
      const category = await apiWithAuth(`/categories/${categoryId}`);

      return {
        data: CoursesWithCategorySchema.parse(category),
        success: true,
      };
    } catch {
      return { success: false };
    }
  },
};

import { CategoryArraySchema } from "@/schemas/categorySchema";
import { apiWithAuth } from "./apiWithAuth";
import { CoursesArraySchema } from "@/schemas/courseSchema";

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
      const courses = category.courses;

      if (!courses) return [];

      return CoursesArraySchema.parse(courses);
    } catch (err) {
      console.error(err);

      return null;
    }
  },
};

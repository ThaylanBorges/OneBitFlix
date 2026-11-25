import { CategoryArraySchema } from "@/schemas/categorySchema";
import { apiWithAuth } from "./apiWithAuth";
import { CoursesArraySchema } from "@/schemas/courseSchema";

export const categoryService = {
  getCategories: async () => {
    const { categories } = await apiWithAuth("/categories");
    return CategoryArraySchema.parse(categories);
  },
  getCoursesWithCategory: async (categoryId: number) => {
    const category = await apiWithAuth(`/categories/${categoryId}/courses`);
    return CoursesArraySchema.parse(category.courses);
  },
};

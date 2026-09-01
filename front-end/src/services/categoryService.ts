import { apiWithAuth } from "./apiWithAuth";

export const categoryService = {
  getCategories: async () => {
    try {
      const { categories } = await apiWithAuth("/categories");

      return categories;
    } catch {
      return [];
    }
  },
  getCoursesWithCategorie: async (categoryId: number) => {
    try {
      return apiWithAuth(`/categories/${categoryId}`);
    } catch {
      return [];
    }
  },
};

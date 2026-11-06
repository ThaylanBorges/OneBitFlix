import {
  CategoryInputType,
  CategoryListSchema,
} from "@/schemas/admin/categorySchema";
import { apiWithAuth } from "../apiWithAuth";

export const categoryService = {
  list: async (currentPage: number) => {
    try {
      const result = await apiWithAuth(
        `/management/categories?page=${currentPage}`,
      );
      return CategoryListSchema.parse(result);
    } catch {
      return null;
    }
  },

  show: async (id: number) => {
    try {
      return await apiWithAuth(`/management/categories/${id}`);
    } catch {
      return null;
    }
  },

  create: async (data: CategoryInputType) => {
    return await apiWithAuth("/management/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (id: number, data: CategoryInputType) => {
    return await apiWithAuth(`/management/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  remove: async (id: number) => {
    return await apiWithAuth(`/management/categories/${id}`, {
      method: "DELETE",
    });
  },
};

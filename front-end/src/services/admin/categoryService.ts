import {
  CategoryDetailSchema,
  CategoryInputType,
  CategoryListSchema,
} from "@/schemas/admin/categorySchema";
import { apiWithAuth } from "../apiWithAuth";
import { ApiError } from "../errors";

export const categoryService = {
  list: async (currentPage: number) => {
    const result = await apiWithAuth(
      `/management/categories?page=${currentPage}`,
    );
    return CategoryListSchema.parse(result);
  },

  findAll: async () => {
    const result = await apiWithAuth(`/management/categories/?perPage=100`);
    return CategoryListSchema.parse(result);
  },

  show: async (id: number) => {
    try {
      return CategoryDetailSchema.parse(
        await apiWithAuth(`/management/categories/${id}`),
      );
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return null;

      throw err;
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

import {
  CourseCreatePayloadType,
  CourseListSchema,
  CourseSchema,
  CourseShowSchema,
  CourseUpdateType,
} from "@/schemas/admin/courseSchema";
import { apiWithAuth } from "../apiWithAuth";

export const courseService = {
  list: async (currentPage: number) => {
    try {
      const result = await apiWithAuth(
        `/management/courses?page=${currentPage}`,
      );

      return CourseListSchema.parse(result);
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  show: async (id: number) => {
    try {
      const result = await apiWithAuth(`/management/courses/${id}`);

      return CourseShowSchema.parse(result);
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  create: async (data: CourseCreatePayloadType) => {
    const result = await apiWithAuth(`/management/courses`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    return CourseSchema.parse(result);
  },

  urlForSaveThumbnail: async (
    id: number,
    contentType: string,
    size: number,
  ) => {
    return await apiWithAuth(`/management/courses/${id}/thumbnail`, {
      method: "POST",
      body: JSON.stringify({
        contentType,
        size,
      }),
    });
  },

  edit: async (id: number, data: CourseUpdateType) => {
    return await apiWithAuth(`/management/courses/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  delete: async (id: number) => {
    return await apiWithAuth(`/management/courses/${id}`, { method: "DELETE" });
  },
};

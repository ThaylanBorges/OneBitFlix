import {
  CourseCreatePayloadType,
  CourseListSchema,
  CourseSchema,
  CourseShowSchema,
  CourseUpdateType,
  ThumbnailUrlSchema,
} from "@/schemas/admin/courseSchema";
import { apiWithAuth } from "../apiWithAuth";
import { ApiError } from "../errors";

export const courseService = {
  list: async (currentPage: number) => {
    const result = await apiWithAuth(`/management/courses?page=${currentPage}`);
    return CourseListSchema.parse(result);
  },

  show: async (id: number) => {
    try {
      return CourseShowSchema.parse(
        await apiWithAuth(`/management/courses/${id}`),
      );
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return null;

      throw err;
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
    return ThumbnailUrlSchema.parse(
      await apiWithAuth(`/management/courses/${id}/thumbnail`, {
        method: "POST",
        body: JSON.stringify({
          contentType,
          size,
        }),
      }),
    );
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

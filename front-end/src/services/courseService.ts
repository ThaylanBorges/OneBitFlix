import {
  CoursesArraySchema,
  CourseWithEpisodesSchema,
} from "@/schemas/courseSchema";
import { api } from "./api";
import { apiWithAuth } from "./apiWithAuth";
import { cache } from "react";
import { ApiError } from "./errors";

export const courseService = {
  getById: cache(async (id: number) => {
    try {
      return CourseWithEpisodesSchema.parse(
        await apiWithAuth(`/courses/${id}`),
      );
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return null;

      throw err;
    }
  }),
  getNewestCourses: async () => {
    const res = await api("/courses/newest");
    return CoursesArraySchema.parse(res);
  },
  getFeaturedCourses: async () => {
    const res = await apiWithAuth("/courses/featured");
    return CoursesArraySchema.parse(res);
  },
  addToFavorites: async (courseId: number) => {
    return await apiWithAuth(`/favorites/${courseId}`, {
      method: "POST",
    });
  },
  removeFromFavorites: async (courseId: number) => {
    return await apiWithAuth(`/favorites/${courseId}`, {
      method: "DELETE",
    });
  },
  addLike: async (courseId: number) => {
    return await apiWithAuth(`/likes/${courseId}`, {
      method: "POST",
    });
  },
  removeLike: async (courseId: number) => {
    return await apiWithAuth(`/likes/${courseId}`, { method: "DELETE" });
  },
  getFavorites: async () => {
    const { courses } = await apiWithAuth("/favorites");
    return CoursesArraySchema.parse(courses);
  },
  search: async (name: string) => {
    const { courses } = await apiWithAuth(
      `/courses/search/?name=${encodeURIComponent(name)}`,
    );
    return CoursesArraySchema.parse(courses);
  },
};

import {
  CoursesArraySchema,
  CourseWithEpisodesSchema,
} from "@/schemas/courseSchema";
import { api } from "./api";
import { apiWithAuth } from "./apiWithAuth";
import { cache } from "react";

export const courseService = {
  getById: cache(async (id: number) => {
    try {
      const res = await apiWithAuth(`/courses/${id}`);
      return CourseWithEpisodesSchema.parse(res);
    } catch {
      return null;
    }
  }),
  getNewestCourses: async () => {
    try {
      const res = await api("/courses/newest");
      return CoursesArraySchema.parse(res);
    } catch {
      return [];
    }
  },
  getFeaturedCourses: async () => {
    try {
      const res = await apiWithAuth("/courses/featured");
      return CoursesArraySchema.parse(res);
    } catch {
      return [];
    }
  },
  addToFavorites: async (courseId: number) => {
    try {
      await apiWithAuth(`/favorites/${courseId}`, {
        method: "POST",
      });
      return true;
    } catch {
      return false;
    }
  },
  removeFromFavorites: async (courseId: number) => {
    try {
      await apiWithAuth(`/favorites/${courseId}`, {
        method: "DELETE",
      });
      return true;
    } catch {
      return false;
    }
  },
  addLike: async (courseId: number) => {
    try {
      await apiWithAuth(`/likes/${courseId}`, {
        method: "POST",
      });

      return true;
    } catch {
      return false;
    }
  },
  removeLike: async (courseId: number) => {
    try {
      await apiWithAuth(`/likes/${courseId}`, { method: "DELETE" });
      return true;
    } catch {
      return false;
    }
  },
  getFavorites: async () => {
    try {
      const { courses } = await apiWithAuth("/favorites");

      return CoursesArraySchema.parse(courses);
    } catch {
      return [];
    }
  },

  search: async (name: string) => {
    try {
      const { courses } = await apiWithAuth(`/courses/search/?name=${name}`);

      return CoursesArraySchema.parse(courses);
    } catch {
      return [];
    }
  },
};

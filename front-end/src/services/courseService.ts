import {
  CoursesArraySchema,
  CourseWithEpisodes,
  CourseWithEpisodesSchema,
} from "@/schemas/courseSchema";
import { api } from "./api";
import { apiWithAuth } from "./apiWithAuth";

export const courseService = {
  getById: async (
    id: number,
  ): Promise<
    { data: CourseWithEpisodes; success: true } | { success: false }
  > => {
    try {
      const res = await apiWithAuth(`/courses/${id}`);
      const course = CourseWithEpisodesSchema.parse(res);
      return { data: course, success: true };
    } catch {
      return { success: false };
    }
  },
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
  addToFavorites: async (courseId: string) => {
    try {
      await apiWithAuth(`/favorites/${courseId}`, {
        method: "POST",
      });
      return true;
    } catch {
      return false;
    }
  },
  removeFromFavorites: async (courseId: string) => {
    try {
      await apiWithAuth(`/favorites/${courseId}`, {
        method: "DELETE",
      });
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

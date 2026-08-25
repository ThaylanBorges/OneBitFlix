import { CoursesArraySchema } from "@/schemas/courseSchema";
import { api } from "./api";
import { apiWithAuth } from "./apiWithAuth";

export const courseService = {
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
};

import { CoursesArraySchema } from "@/schemas/courseSchema";
import { api } from "./api";

export const Courses = {
  getNewestCourses: async () => {
    try {
      const res = await api("/courses/newest");
      return CoursesArraySchema.parse(res);
    } catch {
      return [];
    }
  },
};

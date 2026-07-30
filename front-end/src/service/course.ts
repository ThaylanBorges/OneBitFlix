import { CoursesArraySchema } from "@/schemas/courseSchema";
import { api } from "./api";

export const Courses = {
  getNewestCourses: async () => {
    const res = await api("/courses/newest");
    return CoursesArraySchema.parse(res);
  },
};

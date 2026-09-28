import z from "zod";
import { PaginationSchema } from "./commonSchemas.js";

export const CourseSearchSchema = PaginationSchema.extend({
  name: z.string().min(1).max(100),
});

export type CourseSearch = z.infer<typeof CourseSearchSchema>;

export const PopularCourseSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  synopsis: z.string(),
  thumbnailUrl: z.string().nullable(),
  likes: z.number().int().min(0),
});

export type PopularCourse = z.infer<typeof PopularCourseSchema>;

export const PopularCourseArraySchema = z.array(PopularCourseSchema);

export type PopularCourseArray = z.infer<typeof PopularCourseArraySchema>;

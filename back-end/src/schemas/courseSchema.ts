import z from "zod";
import { IdSchema, PaginationSchema } from "./commonSchemas.js";

export const CourseSchema = z.object({
  id: IdSchema,
  name: z.string().min(1).max(250).trim(),
  synopsis: z.string().min(1).trim(),
  thumbnailUrl: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  categoryId: z.number().int().positive(),
});

export type CourseSchema = z.infer<typeof CourseSchema>;

export const CourseInputSchema = z.object({
  name: z.string().trim().min(1).max(250),
  synopsis: z.string().trim().min(1).max(250),
  thumbnailUrl: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  categoryId: z.number().int().positive(),
});

export type CourseInput = z.infer<typeof CourseInputSchema>;

export const CourseUpdateSchema = CourseInputSchema.partial();

export type CourseUpdate = z.infer<typeof CourseUpdateSchema>;

export const CourseSchemaArray = z.array(
  CourseSchema.omit({ categoryId: true }),
);

export const CourseSearchSchema = PaginationSchema.extend({
  name: z.string().min(1).max(100),
});

export type CourseSearch = z.infer<typeof CourseSearchSchema>;

export const PopularCourseSchema = CourseSchema.extend({
  likes: z.number().int().min(0),
}).omit({ categoryId: true });

export type PopularCourse = z.infer<typeof PopularCourseSchema>;

export const PopularCourseArraySchema = z.array(PopularCourseSchema);

export type PopularCourseArray = z.infer<typeof PopularCourseArraySchema>;

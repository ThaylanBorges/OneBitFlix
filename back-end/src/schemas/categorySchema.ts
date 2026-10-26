import z from "zod";
import { CourseSchemaArray } from "./courseSchema.js";
import { IdSchema } from "./commonSchemas.js";

export const CategorySchema = z.object({
  id: IdSchema,
  name: z.string().trim().min(1).max(100),
  position: z.number().int().positive(),
});

export type CategoryType = z.infer<typeof CategorySchema>;

export const CategoryInputSchema = CategorySchema.omit({ id: true });

export type CategoryInputType = z.infer<typeof CategoryInputSchema>;

export const CategoryWithCoursesSchema = CategorySchema.extend({
  courses: CourseSchemaArray,
});

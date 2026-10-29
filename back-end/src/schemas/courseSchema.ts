import z from "zod";
import { IdSchema, PaginationSchema } from "./commonSchemas.js";
import { MAX_IMAGE_SIZE } from "../constants/file-size.js";

const thumbnailUrl = z
  .string()
  .regex(/^thumbnails\/course-\d+\/[a-z0-9-]+\.(png|jpe?g|webp)$/i);

export const CourseSchema = z.object({
  id: IdSchema,
  name: z.string().trim().min(1).max(250),
  synopsis: z.string().trim().min(1).max(5000),
  thumbnailUrl: thumbnailUrl.optional().nullable(),
  featured: z.boolean().optional(),
  categoryId: z.number().int().positive(),
});

export type CourseSchema = z.infer<typeof CourseSchema>;

export const CourseInputSchema = CourseSchema.omit({ id: true });

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

export const UploadThumbnaiSchema = z.object({
  contentType: z.enum(["image/jpeg", "image/png", "image/webp"]),
  size: z.number().int().positive().max(MAX_IMAGE_SIZE),
});

export type UploadThumbnai = z.infer<typeof UploadThumbnaiSchema>;

import z from "zod";
import { DateSchema, IdSchema, PaginationSchema } from "./commonSchemas";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export const CourseSchema = z.object({
  id: IdSchema,
  name: z.string().trim().min(1).max(250),
  synopsis: z.string().trim().min(1).max(500),
  thumbnailUrl: z.string().trim().min(1).max(500).nullable(),
  featured: z.boolean().optional(),
  categoryId: IdSchema,
  createdAt: DateSchema,
  updatedAt: DateSchema,
});

export type CourseType = z.infer<typeof CourseSchema>;

export const CourseArraySchema = z.array(CourseSchema);

export type CourseArrayType = z.infer<typeof CourseArraySchema>;

export const CourseInputSchema = CourseSchema.extend({
  thumbnail: z
    .instanceof(File, { message: "Selecione uma imagem" })
    .refine((f) => f.size <= MAX_SIZE, "A imagem deve ter no máximo 5 MB")
    .refine((f) => ACCEPTED_TYPES.includes(f.type), "Use PNG, JPG ou WEBP")
    .optional(),
}).omit({
  createdAt: true,
  updatedAt: true,
  id: true,
});

export type CourseInputType = z.infer<typeof CourseInputSchema>;

export const CourseCreatePayloadSchema = CourseInputSchema.omit({
  thumbnail: true,
  thumbnailUrl: true,
});

export type CourseCreatePayloadType = z.infer<typeof CourseCreatePayloadSchema>;

export const CourseUpdateSchema = CourseInputSchema.partial();

export type CourseUpdateType = z.infer<typeof CourseUpdateSchema>;

export const CourseListSchema = PaginationSchema.extend({
  courses: CourseArraySchema,
});

export const CourseShowSchema = CourseSchema.extend({
  categoryName: z.string().trim().min(1).max(250),
});

export type CourseShowType = z.infer<typeof CourseShowSchema>;

export const CourseFormSchema = CourseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  thumbnailUrl: true,
}).extend({
  thumbnail: z
    .instanceof(File, { message: "Selecione uma imagem" })
    .refine((f) => f.size <= MAX_SIZE, "A imagem deve ter no máximo 5 MB")
    .refine((f) => ACCEPTED_TYPES.includes(f.type), "Use PNG, JPG ou WEBP")
    .optional(),
});

export type CourseFormType = z.infer<typeof CourseFormSchema>;

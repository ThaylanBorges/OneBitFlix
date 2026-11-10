import z from "zod";
import { IdSchema } from "./commonSchemas";

export const CategorySchema = z.object({
  id: IdSchema,
  name: z.string().trim().min(1).max(100),
  position: z.number().int().positive(),
});

export type CategoryType = z.infer<typeof CategorySchema>;

export const CategoryDetailSchema = CategorySchema.extend({
  createdAt: z.string().transform((dateString) => new Date(dateString)),
  updatedAt: z.string().transform((dateString) => new Date(dateString)),
});

export type CategoryDetailType = z.infer<typeof CategoryDetailSchema>;

export const CategoryArraySchema = z.array(CategoryDetailSchema);

export type CategoryArrayType = z.infer<typeof CategoryArraySchema>;

export const CategoryInputSchema = CategorySchema.omit({ id: true });

export type CategoryInputType = z.infer<typeof CategoryInputSchema>;

export const CategoryListSchema = z.object({
  page: z.number().int().nonnegative(),
  perPage: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  categories: CategoryArraySchema,
});

export type CategoryListType = z.infer<typeof CategoryListSchema>;

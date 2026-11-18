import z from "zod";

export const IdSchema = z.number().int().positive();

export type Id = z.infer<typeof IdSchema>;

export const DateSchema = z
  .string()
  .transform((dateString) => new Date(dateString));

export type DateType = z.infer<typeof DateSchema>;

export const PaginationSchema = z.object({
  page: z.number().int().nonnegative(),
  perPage: z.number().int().positive(),
  total: z.number().int().nonnegative(),
});

import z from "zod";

export const IdSchema = z.coerce.number().int().positive();

export type Id = z.infer<typeof IdSchema>;

export const PaginationSchema = z.object({
  page: z.coerce.number().positive().default(1),
  perPage: z.coerce.number().positive().max(100).default(10),
});

export type Pagination = z.infer<typeof PaginationSchema>;

export const ParamsIdSchema = z.object({
  id: IdSchema,
});

export type ParamsId = z.infer<typeof ParamsIdSchema>;

export const PasswordSchema = z.string().min(6).max(64);

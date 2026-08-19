import z from "zod";

export const PaginationSchema = z.object({
  page: z.coerce.number().positive().default(1),
  perPage: z.coerce.number().positive().default(10),
});

export type Pagination = z.infer<typeof PaginationSchema>;

export const ParamsIdSchema = z.object({
  id: z.coerce.number().positive().int(),
});

export type ParmasId = z.infer<typeof ParamsIdSchema>;

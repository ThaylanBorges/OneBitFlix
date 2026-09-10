import z from "zod";

export const CategorySchema = z.object({
  id: z.number().positive().int(),
  name: z.string(),
  position: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Category = z.infer<typeof CategorySchema>;

export const CategoryArraySchema = z.array(CategorySchema);

export type CategoryArray = z.infer<typeof CategoryArraySchema>;

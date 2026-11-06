import z from "zod";

export const UserSchema = z.object({
  id: z.number().int().nonnegative(),
  firstName: z.string().min(1),
  email: z.email(),
  createdAt: z.string().transform((dateString) => new Date(dateString)),
});

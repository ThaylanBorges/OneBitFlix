import z from "zod";
import { PasswordSchema } from "./commonSchemas.js";

export const UpdateUserSchema = z.object({
  firstName: z.string().min(3).max(30).optional(),
  lastName: z.string().min(3).max(30).optional(),
  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .pipe(z.string().regex(/^\d{10,15}$/))
    .optional(),
  email: z.email().optional(),
});

export type UpdateUser = z.infer<typeof UpdateUserSchema>;

export const UpdatePasswordSchema = z.object({
  currentPassword: PasswordSchema,
  newPassword: PasswordSchema,
});

export type UpdatePassword = z.infer<typeof UpdatePasswordSchema>;

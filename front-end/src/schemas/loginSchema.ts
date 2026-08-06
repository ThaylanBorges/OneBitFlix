import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("E-mail inválido."),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 carateres.")
    .max(20, "A senha deve ter no máximo 20 caracteres."),
});

export type Login = z.infer<typeof LoginSchema>;

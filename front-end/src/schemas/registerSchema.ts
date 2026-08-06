import { z } from "zod";

const calculateAge = (birthDate: Date): number => {
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const RegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(3, "O nome deve ter no mínimo 3 carateres.")
      .max(30, "O nome deve ter no máximo 30 carateres."),
    lastName: z
      .string()
      .min(3, "O sobrenome deve ter no mínimo 3 carateres.")
      .max(30, "O sobrenome deve ter no máximo 30 carateres."),
    phone: z
      .string()
      .min(10, "O celular deve ter no mínimo 10 carateres.")
      .max(15, "O celular deve ter no máximo 15 carateres."),
    email: z.email("E-mail inválido."),
    birth: z.coerce
      .date()
      .min(new Date("1900-01-01"), "Data de nascimento inválida.")
      .max(new Date(), "Data de nascimento inválida")
      .refine((birthDate) => calculateAge(birthDate) >= 16),
    password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 carateres.")
      .max(20, "A senha deve ter no máximo 20 carateres."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem.",
  });

export type Register = z.infer<typeof RegisterSchema>;

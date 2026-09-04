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

const UserBase = z.object({
  firstName: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres.")
    .max(30, "O nome deve ter no máximo 30 caracteres."),
  lastName: z
    .string()
    .min(3, "O sobrenome deve ter no mínimo 3 caracteres.")
    .max(30, "O sobrenome deve ter no máximo 30 caracteres."),
  phone: z
    .string()
    .min(10, "O celular deve ter no mínimo 10 caracteres.")
    .max(15, "O celular deve ter no máximo 15 caracteres."),
  email: z.email("E-mail inválido."),
});

const Password = z
  .string()
  .min(6, "A senha deve ter no mínimo 6 caracteres.")
  .max(20, "A senha deve ter no máximo 20 caracteres.")
  .trim();

export const RegisterSchema = UserBase.extend({
  birth: z
    .string()
    .min(1, "A data de nascimento é obrigatória.")
    .refine((val) => {
      const date = new Date(val);
      return date >= new Date("1900-01-01");
    }, "Data de nascimento inválida.")
    .refine((val) => {
      const date = new Date(val);
      return date <= new Date();
    }, "Data de nascimento inválida.")
    .refine((val) => {
      const date = new Date(val);
      return calculateAge(date) >= 16;
    }, "Usuário deve ter idade maior que 16."),
  password: Password,
  confirmPassword: Password,
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "As senhas não coincidem.",
});

export type Register = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.email("E-mail inválido."),
  password: Password,
});

export type Login = z.infer<typeof LoginSchema>;

export const EditProfileSchema = UserBase;

export type EditProfile = z.infer<typeof EditProfileSchema>;

export const EditPasswordSchema = z
  .object({
    currentPassword: Password,
    newPassword: Password,
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "As senhas devem ser diferentes.",
  });

export type EditPassword = z.infer<typeof EditPasswordSchema>;

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

export const RegisterSchema = z.object({
  firstName: z.string().min(3).max(30),
  lastName: z.string().min(3).max(30),
  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .pipe(z.string().regex(/^\d{10,15}$/)),
  email: z.email(),
  birth: z.coerce.date().refine((date) => {
    const age = calculateAge(date);
    return date >= new Date("1900-01-01") && date <= new Date() && age >= 16;
  }, "You must be at least 16 years old."),
  password: z.string().min(6).max(20).trim(),
});

export type Register = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(20),
});

export type Login = z.infer<typeof LoginSchema>;

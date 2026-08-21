import "dotenv/config";

import z from "zod";

const envSchema = z.object({
  JWT_SECRET: z.string().min(1, "JWT_SECRET é obrigatório"),
  FRONTEND_URL: z.url("FRONTEND_URL deve ser uma URL válida"),
  PORT: z.coerce.number().int().min(1).max(65535),
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().int().min(1).max(65535),
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASS: z.string().min(1),
  ADMIN_COOKIE_SECRET: z.string().min(1),
  ADMIN_SESSION_SECRET: z.string().min(1),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  BCRYPT_SALT_ROUNDS: z.coerce.number().positive().int().default(12),
  ADMIN_PASSWORD: z.string().min(6).max(20).trim(),
  ADMIN_EMAIL: z.email(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("X Variáveis de ambiente inválidas");
  console.error(z.treeifyError(result.error));
  process.exit(1);
}

export const env = result.data;

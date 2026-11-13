import z from "zod";
import { DateSchema } from "./commonSchemas";

export const UserSchema = z.object({
  id: z.number().int().nonnegative(),
  firstName: z.string().min(1),
  email: z.email(),
  createdAt: DateSchema,
});

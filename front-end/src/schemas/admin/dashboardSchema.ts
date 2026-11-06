import z from "zod";
import { UserSchema } from "./userSchema";

export const DashboardSchema = z.object({
  categories: z.number().int().nonnegative(),
  courses: z.number().int().nonnegative(),
  episodes: z.number().int().nonnegative(),
  standardUsers: z.number().int().nonnegative(),
  recentUsers: z.array(UserSchema),
});

export type DashboardType = z.infer<typeof DashboardSchema>;

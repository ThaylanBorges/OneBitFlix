import z from "zod";
import { PaginationSchema } from "./commonSchemas.js";

export const CourseSearchSchema = PaginationSchema.extend({
  name: z.string().min(1).max(100),
});

export type CourseSearch = z.infer<typeof CourseSearchSchema>;

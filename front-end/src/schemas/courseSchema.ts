import { z } from "zod";

export const CourseSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
  synopsis: z.string(),
  thumbnailUrl: z.string(),
});

export const CoursesArraySchema = z.array(CourseSchema);

export type Course = z.infer<typeof CourseSchema>;

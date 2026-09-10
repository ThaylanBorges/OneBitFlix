import { z } from "zod";
import { EpisodeArraySchema } from "./episodeSchema";
import { CategorySchema } from "./categorySchema";

export const CourseSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
  synopsis: z.string(),
  thumbnailUrl: z.string(),
});

export type Course = z.infer<typeof CourseSchema>;

export const CoursesArraySchema = z.array(CourseSchema);

export type CourseArray = z.infer<typeof CoursesArraySchema>;

export const CourseWithEpisodesSchema = CourseSchema.extend({
  liked: z.boolean(),
  favorited: z.boolean(),
  category: CategorySchema,
  episodes: EpisodeArraySchema,
});

export type CourseWithEpisodes = z.infer<typeof CourseWithEpisodesSchema>;

export const SearchCourseSchema = z.object({
  name: z.string().max(100),
});

export type SeachCourse = z.infer<typeof SearchCourseSchema>;

export const CoursesWithCategorySchema = z.object({
  id: z.number().positive().int(),
  name: z.string(),
  courses: z.array(CourseSchema),
});

export type CoursesWithCategory = z.infer<typeof CoursesWithCategorySchema>;

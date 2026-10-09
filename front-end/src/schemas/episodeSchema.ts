import z from "zod";

export const EpisodeSchema = z.object({
  id: z.number().positive().int(),
  name: z.string(),
  synopsis: z.string(),
  order: z.number().positive().int(),
  videoUrl: z.string().nullable(),
  secondsLong: z.number().nullable(),
});

export type Episode = z.infer<typeof EpisodeSchema>;

export const EpisodeArraySchema = z.array(EpisodeSchema);

export type EpisodeArray = z.infer<typeof EpisodeArraySchema>;

export const WatchTimeSchema = z.object({
  userId: z.number().positive().int().optional(),
  episodeId: z.number().positive().int().optional(),
  seconds: z.number(),
  completedAt: z.coerce.date().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type WatchTime = z.infer<typeof WatchTimeSchema>;

export const EpisodeWatchingSchema = EpisodeSchema.extend({
  course: z.object({
    id: z.number().positive(),
    name: z.string(),
    synopsis: z.string(),
    thumbnailUrl: z.string().nullable(),
  }),
  watchTime: z.object({
    seconds: z.number(),
    updatedAt: z.string(),
  }),
});

export type EpisodeWatching = z.infer<typeof EpisodeWatchingSchema>;

export const EpisodeWatchingArraySchema = z.array(EpisodeWatchingSchema);

export type EpisodeWatchingArray = z.infer<typeof EpisodeWatchingArraySchema>;

export const EpisodeWatchingByCourseSchema = z.object({
  id: z.number().positive().int(),
  name: z.string(),
  order: z.number().positive().int(),
});

export type EpisodeWatchingByCourse = z.infer<
  typeof EpisodeWatchingByCourseSchema
>;

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
  userId: z.number().positive().int(),
  episodeId: z.number().positive().int(),
  seconds: z.number(),
  createdAt: z.string(),
});

export type WatchTime = z.infer<typeof WatchTimeSchema>;

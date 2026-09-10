import z from "zod";

export const EpisodeSchema = z.object({
  id: z.number().positive().int(),
  name: z.string(),
  synopsis: z.string(),
  order: z.number().positive().int(),
  videoUrl: z.string(),
  secondsLong: z.number(),
});

export type Episode = z.infer<typeof EpisodeSchema>;

export const EpisodeArraySchema = z.array(EpisodeSchema);

export type EpisodeArray = z.infer<typeof EpisodeArraySchema>;

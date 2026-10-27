import z from "zod";
import { IdSchema, PaginationSchema } from "./commonSchemas.js";

export const EpisodeSchema = z.object({
  name: z.string().trim().min(1).max(100),
  synopsis: z.string().trim().min(1).max(250),
  order: z.number().int().positive(),
});

export type Episode = z.infer<typeof EpisodeSchema>;

export const EpisodeInputSchema = EpisodeSchema.extend({
  courseId: IdSchema,
});

export type EpisodeInput = z.infer<typeof EpisodeInputSchema>;

export const EpisodeUpdateSchema = EpisodeSchema.partial();

export type EpisodeUpdate = z.infer<typeof EpisodeUpdateSchema>;

export const SecondsSchema = z.object({
  seconds: z.number().int().min(0).max(86400),
});

export type Seconds = z.infer<typeof SecondsSchema>;

export const PaginationEpisodeSchema = PaginationSchema.extend({
  courseId: IdSchema.optional(),
});

export type PaginationEpisode = z.infer<typeof PaginationEpisodeSchema>;

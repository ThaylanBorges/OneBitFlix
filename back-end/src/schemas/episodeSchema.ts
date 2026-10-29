import z from "zod";
import { IdSchema, PaginationSchema, seconds } from "./commonSchemas.js";
import { MAX_VIDEO_SIZE } from "../constants/file-size.js";

const videoUrl = z
  .string()
  .regex(
    /^videos\/course-(\d+)\/episodes-(\d+)-([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.mp4$/i,
  );

export const EpisodeSchema = z.object({
  name: z.string().trim().min(1).max(100),
  synopsis: z.string().trim().min(1).max(250),
  order: z.number().int().positive(),
  secondsLong: seconds.optional(),
  videoUrl: videoUrl.optional(),
});

export type Episode = z.infer<typeof EpisodeSchema>;

export const EpisodeInputSchema = EpisodeSchema.extend({
  courseId: IdSchema,
});

export type EpisodeInput = z.infer<typeof EpisodeInputSchema>;

export const EpisodeUpdateSchema = EpisodeSchema.partial();

export type EpisodeUpdate = z.infer<typeof EpisodeUpdateSchema>;

export const PaginationEpisodeSchema = PaginationSchema.extend({
  courseId: IdSchema.optional(),
});

export type PaginationEpisode = z.infer<typeof PaginationEpisodeSchema>;

export const UploadVideoSchema = z.object({
  contentType: z.literal("video/mp4"),
  size: z.number().int().positive().max(MAX_VIDEO_SIZE),
});

export type UploadVideo = z.infer<typeof UploadVideoSchema>;

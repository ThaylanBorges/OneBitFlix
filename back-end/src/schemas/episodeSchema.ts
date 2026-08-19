import z from "zod";

export const VideoUrlSchema = z.object({
  videoUrl: z.url().min(2),
});

export type VideoUrl = z.infer<typeof VideoUrlSchema>;

export const SecondsSchema = z.object({
  seconds: z.number().min(10).max(9999),
});

export type Seconds = z.infer<typeof SecondsSchema>;

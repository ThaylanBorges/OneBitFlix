import z from "zod";

export const VideoUrlSchema = z.object({ url: z.url() });

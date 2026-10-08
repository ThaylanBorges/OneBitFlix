import z from "zod";

export const SecondsSchema = z.object({
  seconds: z.number().int().min(0).max(86400),
});

export type Seconds = z.infer<typeof SecondsSchema>;

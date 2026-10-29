import z from "zod";
import { seconds } from "./commonSchemas.js";

export const WatchTimeSchema = z.object({
  seconds: seconds,
});

export type WatchTime = z.infer<typeof WatchTimeSchema>;

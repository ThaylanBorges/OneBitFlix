import { WatchTimeSchema } from "@/schemas/episodeSchema";
import { apiWithAuth } from "./apiWithAuth";

export const episodeService = {
  getTokenStream: async (episodeId: number) => {
    try {
      return await apiWithAuth(`/episodes/${episodeId}/token`);
    } catch {
      return null;
    }
  },
  getWatchTime: async (episodeId: number) => {
    try {
      const result = WatchTimeSchema.parse(
        await apiWithAuth(`/episodes/${episodeId}/watchTime`),
      );

      return result.seconds;
    } catch {
      return 0;
    }
  },
};

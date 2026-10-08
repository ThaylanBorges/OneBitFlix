import {
  EpisodeWatchingArraySchema,
  WatchTimeSchema,
} from "@/schemas/episodeSchema";
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
  setWatchTime: async (episodeId: number, seconds: number) => {
    try {
      await apiWithAuth(`/episodes/${episodeId}/watchTime`, {
        method: "POST",
        body: JSON.stringify({ seconds }),
      });

      return true;
    } catch {
      return false;
    }
  },
  getWating: async () => {
    try {
      const episodes = await apiWithAuth(`/users/current/watching`);

      return EpisodeWatchingArraySchema.parse(episodes);
    } catch {
      return null;
    }
  },
  setCompleted: async (id: number, seconds: number) => {
    try {
      await apiWithAuth(`/episodes/${id}/complete`, {
        method: "POST",
        body: JSON.stringify({ seconds }),
      });
    } catch {
      return null;
    }
  },
};

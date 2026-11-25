import {
  EpisodeWatchingArraySchema,
  EpisodeWatchingByCourseSchema,
  WatchTimeSchema,
} from "@/schemas/episodeSchema";
import { apiWithAuth } from "./apiWithAuth";
import { VideoUrlSchema } from "@/schemas/videoUrlSchema";
import { ApiError } from "./errors";

export const episodeService = {
  getVideoUrl: async (episodeId: number) => {
    try {
      return VideoUrlSchema.parse(
        await apiWithAuth(`/episodes/${episodeId}/video`),
      );
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return null;

      throw err;
    }
  },
  getWatchTime: async (episodeId: number) => {
    const result = WatchTimeSchema.nullable().parse(
      await apiWithAuth(`/episodes/${episodeId}/watchTime`),
    );

    return result?.seconds ?? 0;
  },
  setWatchTime: async (episodeId: number, seconds: number) => {
    return await apiWithAuth(`/episodes/${episodeId}/watchTime`, {
      method: "POST",
      body: JSON.stringify({ seconds }),
    });
  },
  getWatching: async () => {
    const episodes = await apiWithAuth(`/users/current/watching`);
    return EpisodeWatchingArraySchema.parse(episodes);
  },
  getWatchingByCourse: async (courseId: number) => {
    const episode = await apiWithAuth(
      `/users/current/watching/course/${courseId}`,
    );
    return EpisodeWatchingByCourseSchema.nullable().parse(episode);
  },
  setCompleted: async (id: number) => {
    return await apiWithAuth(`/episodes/${id}/complete`, {
      method: "POST",
    });
  },
  removeCompleted: async (id: number) => {
    return await apiWithAuth(`/episodes/${id}/complete`, {
      method: "DELETE",
    });
  },
};

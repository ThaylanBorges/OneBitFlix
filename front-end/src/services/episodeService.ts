import {
  EpisodeWatchingArraySchema,
  EpisodeWatchingByCourseSchema,
  WatchTimeSchema,
} from "@/schemas/episodeSchema";
import { apiWithAuth } from "./apiWithAuth";
import { VideoUrlSchema } from "@/schemas/videoUrlSchema";

export const episodeService = {
  getVideoUrl: async (episodeId: number) => {
    try {
      return VideoUrlSchema.parse(
        await apiWithAuth(`/episodes/${episodeId}/video`),
      );
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
  getWatching: async () => {
    try {
      const episodes = await apiWithAuth(`/users/current/watching`);
      return EpisodeWatchingArraySchema.parse(episodes);
    } catch {
      return null;
    }
  },
  getWatchingByCourse: async (courseId: number) => {
    try {
      const episode = await apiWithAuth(
        `/users/current/watching/course/${courseId}`,
      );
      return EpisodeWatchingByCourseSchema.parse(episode);
    } catch {
      return null;
    }
  },
  setCompleted: async (id: number) => {
    try {
      await apiWithAuth(`/episodes/${id}/complete`, {
        method: "POST",
      });
      return true;
    } catch {
      return false;
    }
  },
  removeCompleted: async (id: number) => {
    try {
      await apiWithAuth(`/episodes/${id}/complete`, {
        method: "DELETE",
      });
      return true;
    } catch {
      return false;
    }
  },
};

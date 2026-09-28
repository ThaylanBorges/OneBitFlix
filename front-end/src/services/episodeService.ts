import { apiWithAuth } from "./apiWithAuth";

export const episodeService = {
  getTokenStream: async (episodeId: number) => {
    try {
      return await apiWithAuth(`/episodes/${episodeId}/token`);
    } catch {
      return null;
    }
  },
};

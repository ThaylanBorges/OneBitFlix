import { WatchTime } from "../models/WatchTime.js";
import { Episode } from "../models/Episodes.js";

export const episodeService = {
  findById: (id: number) => {
    return Episode.findByPk(id);
  },

  getWatchTime: async (userId: number, episodeId: number) => {
    return await WatchTime.findOne({
      where: { userId, episodeId },
    });
  },

  setWatchTime: async (userId: number, episodeId: number, seconds: number) => {
    return WatchTime.upsert({ userId, episodeId, seconds });
  },

  setCompleted: async (userId: number, episodeId: number) => {
    return WatchTime.upsert({
      userId,
      episodeId,
      seconds: 0,
      completedAt: new Date(),
    });
  },

  removeCompleted: async (userId: number, episodeId: number) => {
    return WatchTime.destroy({ where: { episodeId, userId } });
  },
};

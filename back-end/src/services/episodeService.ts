import { WatchTime } from "../models/WatchTime.js";
import { AppError } from "../errors/AppError.js";
import { Episode } from "../models/Episodes.js";

export const episodeService = {
  findById: (id: number) => {
    return Episode.findByPk(id);
  },

  getWatchTime: async (userId: number, episodeId: number) => {
    const watchTime = await WatchTime.findOne({
      where: { userId, episodeId },
    });

    return watchTime;
  },

  setWatchTime: async (userId: number, episodeId: number, seconds: number) => {
    const verifyEpisode = await Episode.findByPk(episodeId);

    if (!verifyEpisode) throw new AppError("Episode not found.", 404);

    return WatchTime.upsert({ userId, episodeId, seconds });
  },

  setCompleted: async (userId: number, episodeId: number) => {
    const verifyEpisode = await Episode.findByPk(episodeId);

    if (!verifyEpisode) throw new AppError("Episode not found.", 404);

    return WatchTime.upsert({
      userId,
      episodeId,
      seconds: 0,
      completedAt: new Date(),
    });
  },

  removeCompleted: async (userId: number, episodeId: number) => {
    const verifyEpisode = await Episode.findByPk(episodeId);

    if (!verifyEpisode) throw new AppError("Episode not found.", 404);

    return WatchTime.destroy({ where: { episodeId, userId } });
  },
};

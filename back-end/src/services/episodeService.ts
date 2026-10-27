import { WatchTime } from "../models/WatchTime.js";
import { Episode } from "../models/Episodes.js";
import { EpisodeInput } from "../schemas/episodeSchema.js";

export const episodeService = {
  findAll: async (
    page: number,
    perPage: number,
    courseId: number | undefined,
  ) => {
    const filter = {
      ...(courseId !== undefined && { courseId }),
    };

    const { rows, count } = await Episode.findAndCountAll({
      limit: perPage,
      offset: (page - 1) * perPage,
      order: [
        ["courseId", "ASC"],
        ["order", "ASC"],
      ],
      where: filter,
    });

    return {
      episodes: rows,
      page,
      perPage,
      total: count,
    };
  },

  findById: async (id: number) => {
    return await Episode.findByPk(id);
  },

  verifyOrder: async (courseId: number, order: number) => {
    return await Episode.findOne({ where: { courseId, order } });
  },

  create: async (data: EpisodeInput) => {
    return await Episode.create(data);
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

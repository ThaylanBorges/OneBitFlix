import { Response } from "express";
import path from "path";
import { createReadStream, promises as fsPromises } from "fs";
import { WatchTime } from "../models/WatchTime.js";

export const episodesService = {
  streamEpisodeToResponse: async (
    videoUrl: string,
    res: Response,
    range: string | undefined,
  ) => {
    const filePath = path.join(process.cwd(), "uploads", videoUrl);
    const fileStat = await fsPromises.stat(filePath);

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");

      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1;

      const chunkSize = end - start + 1;

      const file = createReadStream(filePath, { start, end });

      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
        "Accept-Ranges": "bytes",
        "Content-length": chunkSize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head);

      file.pipe(res);
    } else {
      const head = {
        "Content-length": fileStat.size,
        "Content-Type": "video/mp4",
      };

      res.writeHead(200, head);
      createReadStream(filePath).pipe(res);
    }
  },

  getWatchTime: async (userId: number, episodeId: number) => {
    const watchTime = await WatchTime.findOne({
      where: { userId, episodeId },
    });

    return watchTime;
  },

  setWatchTime: async (userId: number, episodeId: number, seconds: number) => {
    const watchTimeAlreadyExists = await WatchTime.findOne({
      where: {
        userId,
        episodeId,
      },
    });

    if (watchTimeAlreadyExists) {
      watchTimeAlreadyExists.seconds = seconds;
      await watchTimeAlreadyExists.save();
      return watchTimeAlreadyExists;
    } else {
      const watchTime = await WatchTime.create({ userId, episodeId, seconds });

      return watchTime;
    }
  },
};

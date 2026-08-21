import { Response } from "express";
import path from "path";
import { createReadStream, promises as fsPromises } from "fs";
import { WatchTime } from "../models/WatchTime.js";
import { AppError } from "../errors/AppError.js";
import { Episode } from "../models/Episodes.js";

const contentTypeMap: Record<string, string> = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
};

export const episodeService = {
  findById: (id: number) => {
    return Episode.findByPk(id);
  },

  streamEpisodeToResponse: async (
    videoUrl: string,
    res: Response,
    range: string | undefined,
  ) => {
    const uploadsDir = path.join(process.cwd(), "uploads");
    const filePath = path.resolve(uploadsDir, videoUrl);

    if (!filePath.startsWith(uploadsDir + path.sep))
      throw new AppError("Access denied.", 403);

    const ext = path.extname(filePath).toLowerCase();
    const contentType = contentTypeMap[ext];
    if (!contentType) throw new AppError("File type not allowed.", 403);

    const fileStat = await fsPromises.stat(filePath).catch(() => {
      throw new AppError("Episode file not found.", 404);
    });

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
        "Content-Type": contentType,
      };

      res.writeHead(206, head);

      file.pipe(res);
    } else {
      const head = {
        "Content-length": fileStat.size,
        "Content-Type": contentType,
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
      return WatchTime.create({ userId, episodeId, seconds });
    }
  },
};

import { QueryTypes } from "sequelize";
import { sequelize } from "../database/index.js";
import { AppError } from "../errors/AppError.js";
import { User, UserCreationAttributes } from "../models/User.js";

export const usersServices = {
  findById: async (id: number) => {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });
    return user;
  },

  findByEmail: async (email: string) => {
    const user = await User.findOne({ where: { email } });
    return user;
  },

  create: async (attributes: UserCreationAttributes) => {
    const newUser = await User.create(attributes);
    return newUser;
  },

  update: async (
    id: number,
    attributes: Partial<
      Omit<
        UserCreationAttributes,
        "id" | "password" | "createdAt" | "updatedAt" | "role" | "birth"
      >
    >,
  ) => {
    await User.update(attributes, { where: { id } });
  },

  updatePassword: async (
    id: number,
    currentPassword: string,
    password: string,
  ) => {
    const user = await User.findByPk(id);

    if (!user) throw new AppError("User not found", 404);

    const passwordMatch = await user.checkPassword(currentPassword);

    if (!passwordMatch) throw new AppError("Current Password Incorrect", 400);

    user.password = password;
    await user.save();
  },

  getEpisodeByCourseId: async (userId: number, courseId: number) => {
    const sql = `
      SELECT e.id, e.name, e.order 
      FROM watch_times wt
      JOIN episodes e ON e.id = wt.episode_id
      WHERE wt.user_id = :userId
        AND wt.completed_at IS NULL
        AND e.course_id = :courseId
      ORDER BY e.course_id, e.order DESC
      LIMIT 1;
    `;

    const row = await sequelize.query(sql, {
      replacements: { userId, courseId },
      type: QueryTypes.SELECT,
    });

    return row[0] ?? null;
  },

  getKeepWatchingList: async (id: number) => {
    const sql = `
      SELECT * 
      FROM (
        SELECT DISTINCT ON (e.course_id)
          e.id, 
          e.name, 
          e.synopsis, 
          e.order, 
          e.video_url AS "videoUrl",  
          e.seconds_long AS "secondsLong", 
          e.course_id AS "courseId",
          c.id AS "course.id",
          c.name AS "course.name",
          c.synopsis AS "course.synopsis",
          c.thumbnail_url AS "course.thumbnailUrl",
          wt.seconds AS "watchTime.seconds", 
          wt.updated_at AS "watchTime.updatedAt"
        FROM watch_times wt
        JOIN episodes e ON e.id = wt.episode_id
        JOIN courses c ON e.course_id = c.id
        WHERE wt.user_id = :userId
          AND wt.completed_at IS NULL
        ORDER BY e.course_id, e.order DESC
      ) AS last_by_course ORDER BY "watchTime.updatedAt" DESC;
    `;

    const rows = await sequelize.query(sql, {
      replacements: { userId: id },
      type: QueryTypes.SELECT,
      nest: true,
    });

    return rows;
  },
};

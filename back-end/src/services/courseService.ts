import { Op, QueryTypes } from "sequelize";
import { sequelize } from "../database/index.js";
import { Course } from "../models/Course.js";
import {
  CourseInput,
  PopularCourseArraySchema,
} from "../schemas/courseSchema.js";
import { Episode } from "../models/Episodes.js";
import { Category } from "../models/index.js";

export const courseServices = {
  findAll: async (page: number, perPage: number) => {
    const { rows, count } = await Course.findAndCountAll({
      limit: perPage,
      offset: (page - 1) * perPage,
      order: [
        ["id", "ASC"],
        ["name", "ASC"],
      ],
    });

    return { courses: rows, page, perPage, total: count };
  },

  findById: async (id: string | number) => {
    return await Course.findByPk(id);
  },

  create: async (data: CourseInput) => {
    return await Course.create(data);
  },

  delete: async (id: number) => {
    return await Course.destroy({ where: { id } });
  },

  getCourseWithEpisodes: async (id: number, userId: number) => {
    return await Course.findByPk(id, {
      attributes: [
        "id",
        "name",
        "synopsis",
        ["thumbnail_url", "thumbnailUrl"],
        [
          sequelize.literal(`EXISTS (
          SELECT 1 FROM likes
          WHERE likes.course_id = "Course".id
            AND likes.user_id = :userId
        )`),
          "liked",
        ],
        [
          sequelize.literal(`EXISTS (
          SELECT 1 FROM favorites
          WHERE favorites.course_id = "Course".id
            AND favorites.user_id = :userId
        )`),
          "favorited",
        ],
      ],
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: Episode,
          as: "episodes",
          attributes: [
            "id",
            "name",
            "synopsis",
            "order",
            ["video_url", "videoUrl"],
            ["seconds_long", "secondsLong"],
            [
              sequelize.literal(`(
                SELECT watch_times.completed_at
                FROM watch_times
                WHERE watch_times.episode_id = "episodes".id
                  AND watch_times.user_id = :userId
                LIMIT 1
              )`),
              "completedAt",
            ],
          ],
        },
      ],
      order: [[{ model: Episode, as: "episodes" }, "order", "ASC"]],
      replacements: { userId },
    });
  },

  getRandomFeaturedCourses: async () => {
    return await Course.findAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: { featured: true },
      order: sequelize.literal("RANDOM()"),
      limit: 3,
    });
  },

  getTenNewCourses: async () => {
    return await Course.findAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      order: [["created_at", "DESC"]],
      limit: 10,
    });
  },

  findByName: async (name: string, page: number, perPage: number) => {
    const { rows, count } = await Course.findAndCountAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      order: [
        ["name", "ASC"],
        ["id", "ASC"],
      ],
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    return {
      courses: rows,
      page,
      perPage,
      total: count,
    };
  },

  getTopTenByLikes: async () => {
    const result = await sequelize.query(
      `
      SELECT 
        courses.id,
        courses.name,
        courses.synopsis,
        courses.thumbnail_url AS "thumbnailUrl", 
        CAST(COUNT(likes.user_id) AS INT)  AS likes
      FROM courses
        LEFT OUTER JOIN likes
          ON courses.id = likes.course_id
      GROUP BY courses.id
      ORDER BY likes DESC
      LIMIT 10;
      `,
      { type: QueryTypes.SELECT },
    );

    return PopularCourseArraySchema.parse(result);
  },
};

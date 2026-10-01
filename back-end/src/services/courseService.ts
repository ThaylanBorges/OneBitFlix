import { Op, QueryTypes } from "sequelize";
import { sequelize } from "../database/index.js";
import { Course } from "../models/Course.js";
import { PopularCourseArraySchema } from "../schemas/courseSchema.js";
import { AppError } from "../errors/AppError.js";

export const courseServices = {
  findOrFailByPrimaryKey: async (key: string | number) => {
    const course = await Course.findByPk(key);

    if (!course) throw new AppError("Course not found", 404);

    return course;
  },
  findById: async (id: number) => {
    const course = await Course.findOne({
      where: { id },
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      include: [
        {
          association: "category",
          attributes: ["id", "name"],
        },
        {
          association: "episodes",
          attributes: [
            "id",
            "name",
            "synopsis",
            "order",
            ["video_url", "videoUrl"],
            ["seconds_long", "secondsLong"],
          ],
        },
      ],
      order: [
        ["episodes", "order", "ASC"],
        ["episodes", "id", "ASC"],
      ],
    });
    return course;
  },

  getRandomFeaturedCourses: async () => {
    const randomFeaturedCourses = await Course.findAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: { featured: true },
      order: sequelize.literal("RANDOM()"),
      limit: 3,
    });

    return randomFeaturedCourses;
  },

  getTenNewCourses: async () => {
    const newCourses = await Course.findAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      order: [["created_at", "DESC"]],
      limit: 10,
    });

    return newCourses;
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

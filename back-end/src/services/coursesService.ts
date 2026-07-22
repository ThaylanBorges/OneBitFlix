import { Op } from "sequelize";
import { sequelize } from "../database/index.js";
import { Course } from "../models/Course.js";

export const coursesServices = {
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
    const offset = (page - 1) * perPage;

    const { rows, count } = await Course.findAndCountAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: perPage,
      offset,
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
        courses.thumbnail_url AS thumbnailUrl, 
        COUNT(likes.user_id) AS likes
      FROM courses
        LEFT OUTER JOIN likes
          ON courses.id = likes.course_id
      GROUP BY courses.id
      ORDER BY likes DESC
      LIMIT 10;
      `,
    );

    if (!result) return null;

    const [topTen] = result;
    return topTen;
  },
};

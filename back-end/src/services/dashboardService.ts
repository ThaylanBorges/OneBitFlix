import { Category } from "../models/Category.js";
import { Course } from "../models/Course.js";
import { Episode } from "../models/Episodes.js";
import { User } from "../models/User.js";

export const dashboardService = {
  dashboard: async () => {
    const [categories, courses, episodes, standardUsers, recentUsers] =
      await Promise.all([
        Category.count(),
        Course.count(),
        Episode.count(),
        User.count({ where: { role: "user" } }),
        User.findAll({
          where: { role: "user" },
          order: [["createdAt", "DESC"]],
          limit: 10,
          attributes: ["id", "firstName", "email", "createdAt"],
        }),
      ]);

    return {
      categories,
      courses,
      episodes,
      standardUsers,
      recentUsers: recentUsers.map((user) => {
        return {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
          createdAt: user.createdAt.toISOString(),
        };
      }),
    };
  },
};

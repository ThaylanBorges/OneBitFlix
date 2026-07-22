import { ActionRequest, ActionResponse } from "adminjs";
import { Course } from "../../models/Course.js";
import { Episode } from "../../models/Episodes.js";
import { Category } from "../../models/Category.js";
import { User } from "../../models/User.js";
import { DashboardData } from "../types/dashboard.types.js";

export const dashboardHandler = async (
  req: ActionRequest,
  res: ActionResponse,
): Promise<DashboardData> => {
  const courses = await Course.count();
  const episodes = await Episode.count();
  const categories = await Category.count();
  const standardUsers = await User.count({ where: { role: "user" } });
  const recentUsers = await User.findAll({
    where: { role: "user" },
    order: [["createdAt", "DESC"]],
    limit: 10,
    attributes: ["id", "firstName", "email", "createdAt"],
  });

  return {
    courses,
    episodes,
    categories,
    standardUsers,
    recentUsers: recentUsers.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    })),
  };
};

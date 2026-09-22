import { sequelize } from "../database/index.js";
import { AppError } from "../errors/AppError.js";
import { Episode } from "../models/Episodes.js";
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
        "id" | "password" | "createdAt" | "updatedAt" | "role"
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

  getKeepWatchingList: async (id: number) => {
    const [keepWatchingList] = await sequelize.query(
      `
      SELECT DISTINCT ON (course_id) * 
      FROM watch_times
      JOIN episodes ON episodes.id = watch_times.episode_id
      JOIN courses ON courses.id = episodes.course_id
      WHERE watch_times.user_id = :id
      ORDER BY course_id, updated_at DESC  
    `,
      { replacements: { id } },
    );
    return keepWatchingList;
  },
};

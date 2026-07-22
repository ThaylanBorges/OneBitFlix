import { Episode } from "../models/Episodes.js";
import { User, UserCreationAttributes } from "../models/User.js";

function filterLastEpisodesByCourse(episodes: Episode[]) {
  const courseOnList: number[] = [];

  const lastEpisodes = episodes.reduce((currentList, episode) => {
    if (!courseOnList.includes(episode.courseId)) {
      courseOnList.push(episode.courseId);
      currentList.push(episode);
      return currentList;
    }

    const episodeFromSameCourse = currentList.find(
      (ep) => ep.courseId === episode.courseId,
    );

    if (episodeFromSameCourse!.order > episode.order) return currentList;

    const listWithoutEpisodeFromSameCourse = currentList.filter(
      (ep) => ep.courseId !== episode.courseId,
    );
    listWithoutEpisodeFromSameCourse.push(episode);

    return listWithoutEpisodeFromSameCourse;
  }, [] as Episode[]);

  return lastEpisodes;
}

export const usersServices = {
  findById: async (id: number) => {
    const user = await User.findOne({ where: { id } });
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
    attributes: Omit<
      UserCreationAttributes,
      "id" | "password" | "createdAt" | "updatedAt" | "role"
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

    if (!user) throw new Error("User not found");

    if (!(await user.checkPassword(currentPassword)))
      throw new Error("Current Password Incorrect");

    user.password = password;
    await user.save();
  },

  getKeepWatchingList: async (id: number) => {
    const userWithWachingList = await User.findByPk(id, {
      include: {
        association: "watchingEpisodes",

        attributes: [
          "id",
          "name",
          "synopsis",
          "order",
          ["video_url", "videoUrl"],
          ["seconds_long", "secondsLong"],
          ["course_id", "courseId"],
        ],
        include: [
          {
            association: "course",
            attributes: ["id", "name", ["thumbnail_url", "thumbnailUrl"]],
          },
        ],
        through: {
          as: "watchTime",
          attributes: ["seconds", "updatedAt"],
        },
      },
    });

    if (!userWithWachingList) throw new Error("User not found");

    const keepWatchingList = filterLastEpisodesByCourse(
      userWithWachingList.watchingEpisodes!,
    );

    return keepWatchingList.sort((a, b) =>
      a.watchTime!.updatedAt < b.watchTime!.updatedAt ? 1 : -1,
    );
  },
};

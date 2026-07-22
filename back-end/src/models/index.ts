import { Category } from "./Category.js";
import { Course } from "./Course.js";
import { Episode } from "./Episodes.js";
import { Favorite } from "./Favorite.js";
import { Likes } from "./Likes.js";
import { User } from "./User.js";
import { WatchTime } from "./WatchTime.js";

Course.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Category.hasMany(Course, { foreignKey: "categoryId", as: "courses" });

Episode.belongsTo(Course, { foreignKey: "courseId", as: "course" });
Course.hasMany(Episode, { foreignKey: "courseId", as: "episodes" });

User.belongsToMany(Course, {
  through: Favorite,
  foreignKey: "userId",
  as: "favoritesCourses",
});
Course.belongsToMany(User, {
  through: Favorite,
  foreignKey: "courseId",
  as: "favoritesUsers",
});

User.belongsToMany(Course, {
  through: Likes,
  foreignKey: "userId",
  as: "likesCourses",
});
Course.belongsToMany(User, {
  through: Likes,
  foreignKey: "courseId",
  as: "likedByUsers",
});

User.hasMany(WatchTime, {
  foreignKey: "userId",
  as: "watchTimes",
});
WatchTime.belongsTo(User, { foreignKey: "userId", as: "user" });

Episode.hasMany(WatchTime, {
  foreignKey: "episodeId",
  as: "watchTimes",
});
WatchTime.belongsTo(Episode, {
  foreignKey: "episodeId",
  as: "episode",
});

User.belongsToMany(Episode, {
  through: WatchTime,
  foreignKey: "userId",
  as: "watchingEpisodes",
});
Episode.belongsToMany(User, {
  through: WatchTime,
  foreignKey: "episodeId",
  as: "watchingUsers",
});

export { Category, Course, Episode, User, Favorite, Likes, WatchTime };

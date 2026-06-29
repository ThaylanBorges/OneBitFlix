import { Category } from "./Category.js";
import { Course } from "./Course.js";
import { Episode } from "./Episodes.js";

Course.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(Course, { foreignKey: "categoryId" });

Episode.belongsTo(Course, { foreignKey: "courseId" });
Course.hasMany(Episode, { foreignKey: "courseId" });

export { Category, Course, Episode };

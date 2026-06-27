import { Category } from "./Category.js";
import { Course } from "./Course.js";

Course.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(Course, { foreignKey: "categoryId" });

export { Category, Course };

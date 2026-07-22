import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/index.js";

export interface CourseAttributes {
  id: number;
  name: string;
  synopsis: string;
  thumbnailUrl: string;
  featured: boolean;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseCreationAttributes extends Optional<
  CourseAttributes,
  "id" | "thumbnailUrl" | "featured" | "categoryId" | "createdAt" | "updatedAt"
> {}

export class Course extends Model<CourseAttributes, CourseCreationAttributes> {
  declare id: number;
  declare name: string;
  declare synopsis: string;
  declare thumbnailUrl: string;
  declare featured: boolean;
  declare categoryId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}
Course.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    synopsis: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    thumbnailUrl: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    featured: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "categories", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Course",
  },
);

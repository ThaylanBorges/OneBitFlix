import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/index.js";

export interface LikesAttributes {
  userId: number;
  courseId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LikesCreationAttributes extends Optional<
  LikesAttributes,
  "createdAt" | "updatedAt"
> {}

export class Likes extends Model<LikesAttributes, LikesCreationAttributes> {
  declare userId: number;
  declare courseId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Likes.init(
  {
    userId: {
      allowNull: false,
      primaryKey: true,
      references: { model: "users", key: "id" },
      type: DataTypes.INTEGER,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    courseId: {
      allowNull: false,
      primaryKey: true,
      references: { model: "courses", key: "id" },
      type: DataTypes.INTEGER,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
    modelName: "Likes",
  },
);

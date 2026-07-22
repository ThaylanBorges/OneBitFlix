import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/index.js";

export interface FavoritesAttributes {
  userId: number;
  courseId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FavoritesCreationAttributes extends Optional<
  FavoritesAttributes,
  "createdAt" | "updatedAt"
> {}

export class Favorite extends Model<
  FavoritesAttributes,
  FavoritesCreationAttributes
> {
  declare userId: number;
  declare courseId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Favorite.init(
  {
    userId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    courseId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: { model: "courses", key: "id" },
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
    modelName: "Favorites",
  },
);

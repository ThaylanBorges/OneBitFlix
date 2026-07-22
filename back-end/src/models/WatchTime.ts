import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/index.js";
import { Episode } from "./Episodes.js";

export interface WatchTimeAttributes {
  userId: number;
  episodeId: number;
  seconds: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WatchTimeCreationAttributes extends Optional<
  WatchTimeAttributes,
  "createdAt" | "updatedAt"
> {}

export class WatchTime extends Model<
  WatchTimeAttributes,
  WatchTimeCreationAttributes
> {
  declare userId: number;
  declare episodeId: number;
  declare seconds: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

WatchTime.init(
  {
    userId: {
      allowNull: false,
      primaryKey: true,
      references: { model: "users", key: "id" },
      type: DataTypes.INTEGER,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    episodeId: {
      allowNull: false,
      primaryKey: true,
      references: { model: "episodes", key: "id" },
      type: DataTypes.INTEGER,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    seconds: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
    modelName: "WatchTimes",
  },
);

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/index.js";
import { WatchTime } from "./WatchTime.js";

export interface EpisodeAttributes {
  id: number;
  name: string;
  synopsis: string;
  order: number;
  videoUrl: string;
  secondsLong: number;
  courseId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EpisodeCreationAttributes extends Optional<
  EpisodeAttributes,
  "id" | "videoUrl" | "secondsLong" | "createdAt" | "updatedAt"
> {}

export class Episode extends Model<
  EpisodeAttributes,
  EpisodeCreationAttributes
> {
  declare id: number;
  declare name: string;
  declare synopsis: string;
  declare order: number;
  declare videoUrl: string;
  declare secondsLong: number;
  declare courseId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare watchTime?: WatchTime;
}

Episode.init(
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
    order: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    videoUrl: {
      type: DataTypes.STRING,
    },
    secondsLong: {
      type: DataTypes.INTEGER,
    },
    courseId: {
      references: {
        model: "courses",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
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
  { sequelize, modelName: "Episodes" },
);

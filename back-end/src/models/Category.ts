import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/index.js";

export interface CategoryAttributes {
  id: number;
  name: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryCreationAttributes extends Optional<
  CategoryAttributes,
  "id" | "createdAt" | "updatedAt"
> {}

export class Category extends Model<
  CategoryAttributes,
  CategoryCreationAttributes
> {
  declare id: number;
  declare name: string;
  declare position: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Category.init(
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
    position: {
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
  { sequelize, modelName: "Category" },
);

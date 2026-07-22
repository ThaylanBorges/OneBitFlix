import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/index.js";
import bcrypt from "bcrypt";
import { Course } from "./Course.js";
import { Episode } from "./Episodes.js";

export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  birth: Date;
  email: string;
  password: string;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreationAttributes extends Optional<
  UserAttributes,
  "id" | "createdAt" | "updatedAt"
> {}

export class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare phone: string;
  declare birth: Date;
  declare email: string;
  declare password: string;
  declare role: "admin" | "user";
  declare createdAt: Date;
  declare favoritesCourses?: Course[];
  declare watchingEpisodes?: Episode[];

  checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    birth: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM("admin", "user"),
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
    modelName: "User",
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },

      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  },
);

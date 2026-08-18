import { Sequelize } from "sequelize";
import "dotenv/config";
import { env } from "../config/env.js";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASS,
  define: {
    underscored: true,
  },
});

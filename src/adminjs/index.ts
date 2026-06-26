import AdminJS from "adminjs";
import AdminJSSequelize from "@adminjs/sequelize";
import AdminExpress from "@adminjs/express";
import { sequelize } from "../database/index.js";

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin",
  branding: {
    companyName: "OneBitFlix",
    logo: "/onebitflix.svg",
    theme: {
      colors: {
        primary100: "#ff0043",
        primary80: "#ff1057",
        primary60: "#ff3369",
        primary40: "#ff4d7c",
        primary20: "#ff668f",
        grey100: "#151515",
        grey80: "#333333",
        grey60: "#4d4d4d",
        grey40: "#666666",
        grey20: "#dddddd",
        filterBg: "#333333",
        accent: "#151515",
        highlight: "#151515",
      },
    },
  },
});

export const adminJsRouter = AdminExpress.buildRouter(adminJs);

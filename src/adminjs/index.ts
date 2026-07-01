import AdminJS from "adminjs";
import AdminJSSequelize from "@adminjs/sequelize";
import AdminExpress from "@adminjs/express";
import { sequelize } from "../database/index.js";
import { adminJsResources } from "./resources/index.js";
import { componentLoader } from "./component-loader.js";
import { authenticate } from "./auth.js";

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
  componentLoader,
  databases: [sequelize],
  rootPath: "/admin",
  resources: adminJsResources,
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
      },
    },
  },
});

adminJs.watch();

export const adminJsRouter = AdminExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate,
    cookieName: "adminjs",
    cookiePassword: "supersecretpassword",
  },
  null,
  {
    secret: "test",
    resave: false,
    saveUninitialized: false,
  },
);

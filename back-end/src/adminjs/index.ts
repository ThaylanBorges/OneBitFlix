import AdminJS from "adminjs";
import AdminJSSequelize from "@adminjs/sequelize";
import AdminExpress from "@adminjs/express";
import { sequelize } from "../database/index.js";
import { adminJsResources } from "./resources/index.js";
import { componentLoader, Components } from "./component-loader.js";
import { authenticate } from "./auth.js";
import { locale } from "./locale.js";
import { dashboardHandler } from "./handlers/Dashboard.js";
import { brandingOptions } from "./brandingOptions.js";

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
  componentLoader,
  databases: [sequelize],
  rootPath: "/admin",
  resources: adminJsResources,
  branding: brandingOptions,
  locale,
  dashboard: {
    component: Components.Dashboard,
    handler: dashboardHandler,
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

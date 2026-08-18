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
import { env } from "../config/env.js";

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

if (env.NODE_ENV !== "production") adminJs.watch();

export const adminJsRouter = AdminExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate,
    cookieName: "adminjs",
    cookiePassword: env.ADMIN_COOKIE_SECRET,
  },
  null,
  {
    secret: env.ADMIN_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  },
);

import { Router } from "express";
import { dashboardController } from "../../controllers/management/dashboardController.js";
import { categoryRoute } from "./categoryRoutes.js";
import { courseRoute } from "./courseRoutes.js";
import { episodeRoute } from "./episodeRoutes.js";

export const adminRoute = Router();

adminRoute.get("/dashboard", dashboardController.dashboard);
adminRoute.use("/categories", categoryRoute);
adminRoute.use("/courses", courseRoute);
adminRoute.use("/episodes", episodeRoute);

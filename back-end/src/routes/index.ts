import { Router } from "express";
import { authRoute } from "./authRoutes.js";
import { userRoute } from "./userRoutes.js";
import { categoryRoute } from "./categoryRoutes.js";
import { courseRoutes } from "./courseRoutes.js";
import { episodeRoutes } from "./episodeRoutes.js";
import { favoriteRoute } from "./favoriteRoute.js";
import { likeRoute } from "./likeRoutes.js";
import { authMiddleware } from "../middlewares/auth.js";

export const route = Router();

route.use("/auth", authRoute);
route.use("/users", authMiddleware, userRoute);
route.use("/categories", authMiddleware, categoryRoute);
route.use("/courses", courseRoutes);
route.use("/episodes", authMiddleware, episodeRoutes);
route.use("/favorites", authMiddleware, favoriteRoute);
route.use("/likes", authMiddleware, likeRoute);

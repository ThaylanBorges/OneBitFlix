import { Router } from "express";
import { categoryController } from "./controllers/categoryController.js";
import { coursesController } from "./controllers/coursesController.js";
import { episodesController } from "./controllers/episodesController.js";
import { authController } from "./controllers/authController.js";
import { authMiddleware, authMiddlewareQuery } from "./middlewares/auth.js";
import { favoritesController } from "./controllers/favoritesController.js";
import { likesController } from "./controllers/likesController.js";
import { usersController } from "./controllers/usersController.js";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "./middlewares/validate.js";
import { LoginSchema, RegisterSchema } from "./schemas/authSchema.js";
import { PaginationSchema, ParamsIdSchema } from "./schemas/commonSchemas.js";
import { CourseSearchSchema } from "./schemas/courseSchema.js";
import { SecondsSchema, VideoUrlSchema } from "./schemas/episodeSchema.js";

const route = Router();

route.post(
  "/auth/register",
  validateBody(RegisterSchema),
  authController.register,
);
route.post("/auth/login", validateBody(LoginSchema), authController.login);
route.post("/auth/logout", authController.logout);

route.get("/users/current/watching", authMiddleware, usersController.watching);
route.get("/users/current", authMiddleware, usersController.show);
route.put("/users/current", authMiddleware, usersController.update);
route.put(
  "/users/current/password",
  authMiddleware,
  usersController.updatePassword,
);

route.get(
  "/categories",
  authMiddleware,
  validateQuery(PaginationSchema),
  categoryController.index,
);
route.get(
  "/categories/:id",
  validateParams(ParamsIdSchema),
  authMiddleware,
  categoryController.show,
);

route.get("/courses/featured", authMiddleware, coursesController.featured);
route.get("/courses/newest", coursesController.newest);
route.get("/courses/popular", coursesController.popular);
route.get(
  "/courses/search",
  authMiddleware,
  validateQuery(CourseSearchSchema),
  coursesController.search,
);
route.get(
  "/courses/:id",
  authMiddleware,
  validateParams(ParamsIdSchema),
  coursesController.show,
);

route.get(
  "/episodes/stream",
  authMiddlewareQuery,
  validateQuery(VideoUrlSchema),
  episodesController.stream,
);
route.get(
  "/episodes/:id/watchTime",
  authMiddleware,
  validateParams(ParamsIdSchema),
  episodesController.getWatchTime,
);
route.post(
  "/episodes/:id/watchTime",
  authMiddleware,
  validateParams(ParamsIdSchema),
  validateBody(SecondsSchema),
  episodesController.setWatchTime,
);

route.get("/favorites", authMiddleware, favoritesController.index);
route.post(
  "/favorites/:id",
  authMiddleware,
  validateParams(ParamsIdSchema),
  favoritesController.save,
);
route.delete(
  "/favorites/:id",
  authMiddleware,
  validateParams(ParamsIdSchema),
  favoritesController.delete,
);

route.post(
  "/likes/:id",
  authMiddleware,
  validateParams(ParamsIdSchema),
  likesController.save,
);
route.delete(
  "/likes/:id",
  authMiddleware,
  validateParams(ParamsIdSchema),
  likesController.delete,
);

export default route;

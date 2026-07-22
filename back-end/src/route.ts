import { Router } from "express";
import { categoriesController } from "./controllers/categoriesController.js";
import { coursesController } from "./controllers/coursesController.js";
import { episodesController } from "./controllers/episodesController.js";
import { authController } from "./controllers/authController.js";
import { authMiddleware, authMiddlewareQuery } from "./middlewares/auth.js";
import { favoritesController } from "./controllers/favoritesController.js";
import { likesController } from "./controllers/likesController.js";
import { usersController } from "./controllers/usersController.js";

const route = Router();

route.post("/auth/register", authController.register);
route.post("/auth/login", authController.login);

route.get("/users/current/watching", authMiddleware, usersController.watching);
route.get("/users/current", authMiddleware, usersController.show);
route.put("/users/current", authMiddleware, usersController.update);
route.put(
  "/users/current/password",
  authMiddleware,
  usersController.updatePassword,
);

route.get("/categories", authMiddleware, categoriesController.index);
route.get("/categories/:id", authMiddleware, categoriesController.show);

route.get("/courses/featured", authMiddleware, coursesController.featured);
route.get("/courses/newest", coursesController.newest);
route.get("/courses/popular", coursesController.popular);
route.get("/courses/search", authMiddleware, coursesController.search);
route.get("/courses/:id", authMiddleware, coursesController.show);

route.get("/episodes/stream", authMiddlewareQuery, episodesController.stream);
route.get(
  "/episodes/:id/watchTime",
  authMiddleware,
  episodesController.getWatchTime,
);
route.post(
  "/episodes/:id/watchTime",
  authMiddleware,
  episodesController.setWatchTime,
);

route.post("/favorites", authMiddleware, favoritesController.save);
route.get("/favorites", authMiddleware, favoritesController.index);
route.delete(
  "/favorites/:courseId",
  authMiddleware,
  favoritesController.delete,
);

route.post("/likes", authMiddleware, likesController.save);
route.delete("/likes/:courseId", authMiddleware, likesController.delete);

export default route;

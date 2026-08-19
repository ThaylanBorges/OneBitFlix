import { adminJs, adminJsRouter } from "./adminjs/index.js";
import { sequelize } from "./database/index.js";
import express from "express";
import route from "./route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { message: "Too many attempts. Try again late." },
});

const generalLimiter = rateLimit({ windowMs: 60 * 1000, limit: 100 });

const app = express();
app.use(generalLimiter);
app.use("/auth", authLimiter);
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.static("public"));
app.use(express.json({ limit: "10kb" }));
app.use(adminJs.options.rootPath, adminJsRouter);
app.use(route);

const PORT = env.PORT || 3333;
app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log("db connection successful");
  });

  console.log(`Server started successfully at port ${PORT}`);
});

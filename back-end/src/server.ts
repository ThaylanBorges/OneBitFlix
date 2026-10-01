import { adminJs, adminJsRouter } from "./adminjs/index.js";
import { sequelize } from "./database/index.js";
import express from "express";
import route from "./route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middlewares/errorHandler.js";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many attempts. Try again later." },
});

const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skip: (req) =>
    req.path.startsWith("/login") ||
    req.path.startsWith("/register") ||
    req.path.startsWith("/admin"),
});

const app = express();

app.set("trust proxy", 1);

const adminPath = adminJs.options.rootPath;

const apiHelmet = helmet({
  contentSecurityPolicy: {
    useDefaults: false,
    directives: {
      defaultSrc: ["'none'"],
      frameAncestors: ["'none'"],
      baseUri: ["'none'"],
      formAction: ["'none'"],
    },
  },
  xFrameOptions: { action: "deny" },
  crossOriginResourcePolicy: { policy: "cross-origin" },
});

const adminHelmet = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:"],
      fontSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
    },
  },
  crossOriginResourcePolicy: { policy: "cross-origin" },
});

app.use((req, res, next) => {
  if (req.path.startsWith(adminPath)) return adminHelmet(req, res, next);
  return apiHelmet(req, res, next);
});

app.use(generalLimiter);
app.use("/login", authLimiter);
app.use("/register", authLimiter);
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

app.use(errorHandler);

const PORT = env.PORT;
app.listen(PORT, () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("db connection successful");
    })
    .catch(() => {
      console.log("db connection faild");
    });

  console.log(`Server started successfully at port ${PORT}`);
});

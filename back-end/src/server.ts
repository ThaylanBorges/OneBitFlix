import { adminJs, adminJsRouter } from "./adminjs/index.js";
import { sequelize } from "./database/index.js";
import express from "express";
import route from "./route.js";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.static("public"));
app.use(express.json());
app.use(adminJs.options.rootPath, adminJsRouter);
app.use(route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log("db connection successful");
  });

  console.log(`Server started successfully at port ${PORT}`);
});

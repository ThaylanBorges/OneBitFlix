import { adminJs, adminJsRouter } from "./adminjs/index.js";
import { sequelize } from "./database/index.js";
import express from "express";

const app = express();
app.use(express.static("public"));
app.use(adminJs.options.rootPath, adminJsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log("db connextion successfull");
  });

  console.log(`Server started successfuly at port ${PORT}`);
});

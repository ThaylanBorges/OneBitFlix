import bcrypt from "bcrypt";
import { env } from "../config/env.js";

export const DUMMY_HASH = bcrypt.hashSync(
  "dummy-password",
  env.BCRYPT_SALT_ROUNDS,
);

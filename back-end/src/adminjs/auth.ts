import { DUMMY_HASH } from "../constants/dummy-hash.js";
import { User, UserAttributes } from "../models/User.js";
import bycrypt from "bcrypt";

export const authenticate = async (
  email: string,
  password: string,
): Promise<Pick<UserAttributes, "id" | "email" | "role"> | null> => {
  const user = await User.findOne({ where: { email } });
  const passwordHash = user?.password ?? DUMMY_HASH;

  const isPasswordValid = await bycrypt.compare(password, passwordHash);

  if (!user || !isPasswordValid || user.role !== "admin") {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
};

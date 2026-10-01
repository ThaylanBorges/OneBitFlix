import { DUMMY_HASH } from "../constants/dummy-hash.js";
import { User } from "../models/User.js";
import bycrypt from "bcrypt";

interface AdminSession {
  id: number;
  email: string;
  role: string;
}

export const authenticate = async (
  email: string,
  password: string,
): Promise<AdminSession | null> => {
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

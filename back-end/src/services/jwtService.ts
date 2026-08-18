import jwt, { SignOptions } from "jsonwebtoken";
import "dotenv/config";
import { env } from "../config/env.js";

const secret = env.JWT_SECRET;

export const jwtService = {
  signToken: (
    payload: string | object | Buffer,
    expiration: SignOptions["expiresIn"],
  ) => {
    return jwt.sign(payload, secret, {
      expiresIn: expiration,
    });
  },

  verifyToken: (token: string) => {
    return jwt.verify(token, secret);
  },
};

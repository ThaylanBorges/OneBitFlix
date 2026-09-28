import jwt, { SignOptions } from "jsonwebtoken";
import "dotenv/config";
import { env } from "../config/env.js";
import { SessionPayload, SessionStream } from "../@types/express/index.js";

const secret = env.JWT_SECRET;

export const jwtService = {
  signSessionToken: (
    payload: SessionPayload,
    expiration: SignOptions["expiresIn"],
  ) => {
    return jwt.sign(payload, secret, {
      audience: "session",
      expiresIn: expiration,
    });
  },

  signStreamToken: (payload: SessionStream, expiration: number) => {
    return jwt.sign(payload, secret, {
      audience: "streaming",
      expiresIn: expiration + 3600,
    });
  },

  verifySessionToken: (token: string) => {
    return jwt.verify(token, secret, { audience: "session" }) as SessionPayload;
  },

  verifyStreamToken: (token: string) => {
    return jwt.verify(token, secret, {
      audience: "streaming",
    }) as SessionStream;
  },
};

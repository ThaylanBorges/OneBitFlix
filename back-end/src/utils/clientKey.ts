import type { Request } from "express";
import crypto from "crypto";
import { ipKeyGenerator } from "express-rate-limit";
import { env } from "../config/env.js";

function isInternalCall(req: Request) {
  const received = req.header("x-internal-key");

  if (!received) return false;

  const a = Buffer.from(received);
  const b = Buffer.from(env.INTERNAL_API_KEY);

  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}

export function clientKey(req: Request) {
  if (isInternalCall(req)) {
    const ip = req.header("x-client-ip");

    if (ip) return ipKeyGenerator(ip);
  }

  return req.ip ? ipKeyGenerator(req.ip) : "unknown";
}

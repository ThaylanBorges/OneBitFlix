import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      dataBody?: unknown;
      dataQuery?: unknown;
      dataParams?: unknown;
    }
  }
}

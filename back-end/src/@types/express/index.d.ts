import "express";

export interface SessionPayload {
  kind: "session";
  id: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: SessionPayload;
      dataBody?: unknown;
      dataQuery?: unknown;
      dataParams?: unknown;
    }
  }
}

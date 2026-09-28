import "express";

export interface SessionPayload {
  kind: "session";
  id: number;
  firstName: string;
  email: string;
}

export interface SessionStream {
  kind: "stream";
  episodeId: number;
  userId: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: SessionPayload;
      stream?: SessionStream;
      dataBody?: unknown;
      dataQuery?: unknown;
      dataParams?: unknown;
    }
  }
}

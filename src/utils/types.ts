import type { Request } from "express";

export type JwtPayload = {
  userId: number;
  userEmail: string;
};

export type AuthenticatedRequest = Request & {
  jwtPayload?: JwtPayload;
};

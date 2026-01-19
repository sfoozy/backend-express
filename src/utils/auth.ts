
import jwt from "jsonwebtoken";
import type { AuthenticatedRequest, JwtPayload } from "./types";
import type { Response } from "express";

export function generateJwtToken(payload: JwtPayload): string {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
  return token;
}

const BEARER_TOKEN_REGEX = /^Bearer (.+)$/;

export function authHandler(req: AuthenticatedRequest, res: Response, next: any) {
  let token = "";
  if (req.headers.authorization) {
    const match = req.headers.authorization.match(BEARER_TOKEN_REGEX);
    if (match && match.length > 1) {
      token = match[1] || "";
    }
  }

  if (!token) {
    return res.status(401).json(
      { error: "Missing authorization token" }
    );
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json(
        { error: "Invalid authorization token" }
      );
    }

    req.jwtPayload = decoded;
    next();
  });
}
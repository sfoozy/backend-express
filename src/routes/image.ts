import type { Request, Response } from "express";
import express from "express";
import prisma from "../prisma/primsa.js";
import jwt from "jsonwebtoken";
import { authHandler } from "../utils/auth.js";
import type { AuthenticatedRequest } from "../utils/types.js";

const router = express.Router();

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  if (!req.query.id) {
    return res.status(400).json(
      {
        error: "Missing query parameter: 'id'"
      }
    );
  }

  const image = await prisma.image.findUnique({
    where: {
      id: Number(req.query.id)
    }
  });


  if (!image) {
    return res.status(404).json(
      { error: "Image not found" }
    );
  }

  return res.json(image);
});


router.post("/", authHandler, async (req: AuthenticatedRequest, res: Response) => {
  res.json({ statusText: "POST IMAGE", data: req.jwtPayload });
});

export default router;

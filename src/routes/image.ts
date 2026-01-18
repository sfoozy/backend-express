import type { Request, Response } from "express";
import express from "express";
import prisma from "../prisma/primsa.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
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

  return res.json(image)
});


router.post("/", async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json(
      { error: "Missing authorization token" }
    );
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      return res.status(401).json(
        { error: "Invalid authorization token" }
      );
    }

    if (decoded) {
      return res.json(
        {
          statusText: "Token is valid, proceed with the request",
          decoded: decoded
        }
      );
    }
  });
});

export default router;
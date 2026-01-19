import type { Request, Response } from "express";
import express from "express";
import bcrypt from "bcryptjs";
import prisma from "../prisma/primsa.js";
import { generateJwtToken } from "../utils/auth.js";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json(
      { error: "Missing request body" }
    );
  }

  if (!req.body.email) {
    return res.status(400).json(
      { error: "Missing 'email' in request body" }
    );
  }

  if (!req.body.password) {
    return res.status(400).json(
      { error: "Missing 'password' in request body" }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    }
  });

  if (!user) {
    return res.status(401).json(
      { error: "Invalid email" }
    );
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).json(
      { error: "Invalid password" }
    );
  }

  res.json(
    {
      statusText: "Login successful",
      token: generateJwtToken({ userId: user.id, userEmail: user.email }),
    }
  );
});

export default router;
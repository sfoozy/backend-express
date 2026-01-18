import type { Request, Response } from "express";
import express from "express";
import bcrypt from "bcryptjs";
import prisma from "../prisma/primsa.js";
import jwt from "jsonwebtoken";

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

  const payload = { userId: user.id, userEmail: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });

  res.json(
    {
      statusText: "Login successful",
      token: token,
    }
  );
});

export default router;
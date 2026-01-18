import type { Request, Response } from "express";
import express from "express";
import prisma from "../prisma/primsa.js";
import { UserRole } from "../prisma/client/enums.js"
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {

  console.log("BODY:", req.body);

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

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  try {
    await prisma.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
        role: UserRole.USER
      }
    });
  }
  catch (e) {
    return res.status(500).json(
      { error: "Error creating user" }
    );
  }

  return res.json(
    { status: "User created successfully!" }
  );
});

export default router;
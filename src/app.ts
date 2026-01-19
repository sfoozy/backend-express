import "dotenv/config"; // MUST HAVE THIS AT THE TOP FOR PRISMA ORM TO WORK
import express from "express";
import type { Request, Response } from "express";

import * as hello from "./handlers/hello.js";

const app = express();

const port = 8000;

app.listen(port, () => {
  console.log(`==== Listening on port ${port} ====`)
});

app.use(express.json());

// api routes

// HELLO

app.get("/hello", (req: Request, res: Response) => {
  return hello.getHelloHandler(req, res);
});
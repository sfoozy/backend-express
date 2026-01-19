import type { Request, Response } from "express";

export function getHelloHandler(req: Request, res: Response) {
  return res.json(
    {
      statusText: "Hello World!"
    }
  );
}

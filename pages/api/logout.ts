import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    "userId=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0",
  );
  return res.status(200).json({ success: true });
}

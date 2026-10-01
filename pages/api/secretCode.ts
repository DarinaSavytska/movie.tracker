import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { secretCode } = req.body;

  if (secretCode === process.env.SECRET_KEY) {
    res.setHeader("Set-Cookie", `auth=1; Path=/; HttpOnly; SameSite=Strict`);
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false });
}

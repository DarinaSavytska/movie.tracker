import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.OMDb_API_KEY}&s=${req.body.query}&page=${req.body.page}`,
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies: " + error });
  }
}

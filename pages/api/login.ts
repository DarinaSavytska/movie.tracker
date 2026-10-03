import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { _id } = req.body;

  if (_id) {
    res.setHeader(
      'Set-Cookie',
      `userId=${_id}; Path=/; HttpOnly; SameSite=Strict`
    );

    return res.status(200).json({ success: true, _id });
  }

  return res.status(401).json({ success: false });
}

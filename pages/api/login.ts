import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUserInfo } from '@/src/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { login, password } = req.body;

  const user = await checkUserInfo(login, password);

  console.log('user', user);

  if (user) {
    res.setHeader(
      'Set-Cookie',
      `userId=${user._id}; Path=/; HttpOnly; SameSite=Strict`
    );

    return res.status(200).json({ success: true, user });
  }

  return res.status(401).json({ success: false });
}

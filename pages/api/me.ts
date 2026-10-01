// import type { NextApiRequest, NextApiResponse } from "next";
// import { sanity } from "@/src/utils/sanityClient";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const userId = req.cookies.userId;

//   // console.log("req.cookies", req.cookies);

//   if (!userId) {
//     return res.status(401).json({ user: null });
//   }

//   try {
//     const user = await sanity.fetch(
//       '*[_type == "autorization" && _id == $userId][0]',
//       { userId },
//     );

//     if (!user) {
//       return res.status(401).json({ user: null });
//     }

//     // не повертай пароль (навіть хешований) на клієнт
//     const { password, ...safeUser } = user;

//     return res.status(200).json({ user: safeUser });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ user: null });
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";
import { differenceInDays } from "date-fns";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const diff = differenceInDays(new Date(), new Date(2022, 5, 11)).toString().padStart(3, '0');
  res.json({ current: `https://seasonal-pfp-mikker.vercel.app/mikkers/${diff}.png` });
}

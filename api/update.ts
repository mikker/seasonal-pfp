import type { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";
import { differenceInDays } from "date-fns";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.query.api_key !== process.env.API_KEY!) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const diff = differenceInDays(new Date(), new Date(2022, 5, 11));

  const userClient = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY!,
    appSecret: process.env.TWITTER_CONSUMER_SECRET!,
    accessToken: process.env.TWITTER_ACCESS_TOKEN!,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
  });

  await userClient.v1.updateAccountProfileImage(
    path.join(process.cwd(), "_files", "mikkers", `${diff}.png`)
  );

  res.json({ day: diff });
}

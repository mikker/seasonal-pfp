import type { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";
import { intervalToDuration } from "date-fns";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const diff = intervalToDuration({
    start: new Date(2022, 5, 11),
    end: new Date(),
  }).days;

  const userClient = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY!,
    appSecret: process.env.TWITTER_CONSUMER_SECRET!,
    accessToken: process.env.TWITTER_ACCESS_TOKEN!,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
  });

  await userClient.v1.updateAccountProfileImage(`public/mikkers/${diff}.png`)

  res.json({ day: diff })
}

import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";
import { IncomingForm } from "formidable";
import fs from "fs";
import { promisify } from "util";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const unlinkAsync = promisify(fs.unlink);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const form = new IncomingForm({ uploadDir: "./public/uploads", keepExtensions: true });

    // Parse form data
    const { fields, files }: any = await new Promise((resolve, reject) => {
      form.parse(req as any, (err: any, fields: any, files: any) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const userId = fields.userId?.[0];
    const text = fields.text?.[0];

    if (!text) {
      return NextResponse.json({ error: "Tweet text is required." }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ error: "User ID is required." }, { status: 400 });
    }

    // Fetch user's OAuth tokens from database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { twitterOauthToken: true, twitterOauthSecret: true },
    });

    if (!user?.twitterOauthToken || !user?.twitterOauthSecret) {
      return NextResponse.json({ error: "No valid Twitter credentials found." }, { status: 401 });
    }

    const accessToken = user.twitterOauthToken;
    const accessSecret = user.twitterOauthSecret;

    // ✅ Correct way to authenticate with user access tokens
    const userClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken :"AjHPdZjFqBu7L1TvfW2xQcah6A03JM3S4CUC1t5NZEWfA",
      accessSecret:"AjHPdZjFqBu7L1TvfW2xQcah6A03JM3S4CUC1t5NZEWfA",
    });

    const rwClient = userClient.readWrite; // Get Read-Write client

    let tweetResponse;

    if (files.image) {
      const imagePath = files.image[0].filepath;

      try {
        const mediaId = await rwClient.v1.uploadMedia(imagePath);
        tweetResponse = await rwClient.v2.tweet(text, {
          media: { media_ids: [mediaId] },
        });
      } finally {
        await unlinkAsync(imagePath);
      }
    } else {
      tweetResponse = await rwClient.v2.tweet(text);
    }

    return NextResponse.json({
      message: "Tweet posted successfully!",
      tweet: tweetResponse,
    });
  } catch (error) {
    console.error("Error posting tweet:", error);
    return NextResponse.json({ error: "Failed to post tweet" }, { status: 500 });
  }
}

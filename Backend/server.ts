import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import { TwitterApi } from "twitter-api-v2";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const twitterClient = new TwitterApi({
  appKey: process.env.APPKEY as string,
  appSecret: process.env.APPSECRET as string,
  accessToken: process.env.ACCESSTOKEN as string,
  accessSecret: process.env.ACCESSSECRET as string,
});

app.post("/generate-tweets", async (req, res) => {
  try {
    const { prompt, tone } = req.body;
    const systemPrompt = `Generate 4 engaging tweets in ${tone} tone based on this prompt:
    ${prompt}. Format output as a list of tweets without numbering.`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: systemPrompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    const generatedText = response.data.candidates[0].content.parts[0].text;
    console.log(generatedText);

    const tweets = generatedText
      .split("\n")
      .filter((text: string) => text.trim() !== "")
      .slice(0, 4)
      .map((text: string, index: number) => ({ id: index + 1, text: text.trim() }));

    res.json({ tweets });
  } catch (error: any) {
    console.error("Error generating tweets:", error.response?.data || error);
    res.status(500).json({ error: "Error generating tweets" });
  }
});

app.post("/post-tweet", async (req: any, res: any) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Tweet text is required" });

    const tweet = await twitterClient.v2.tweet(text);
    console.log("Tweet posted successfully!", tweet);

    res.json({ message: "Tweet posted successfully!", tweet });
  } catch (error) {
    console.error("Error posting tweet:", error);
    res.status(500).json({ error: "Error posting tweet" });
  }
});

app.post("/analyze-tweet", async (req:any, res:any) => {
  try {
    const { text, tone } = req.body;
    if (!text) return res.status(400).json({ error: "Tweet text is required" });

    const systemPrompt = `
    Analyze this tweet: "${text}"
    
    Provide an analysis in the following JSON structure:
    {
      "engagementMetrics": {
        "viralProbability": number, // percentage between 0-100
        "likeabilityScore": number, // percentage between 0-100
        "retweetPotential": number // percentage between 0-100
      },
      "predictedPerformance": {
        "expectedLikes": {
          "min": number,
          "max": number
        },
        "expectedRetweets": {
          "min": number,
          "max": number
        },
        "expectedComments": {
          "min": number,
          "max": number
        }
      },
      "optimizationSuggestions": [
        {
          "title": string,
          "description": string,
          "action": string // one of "Schedule", "Apply", or "Modify"
        }
      ]
    }
    
    Only output valid JSON with no additional text.
    `;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: systemPrompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    const generatedText = response.data.candidates[0].content.parts[0].text;
    
    
    const jsonStartIndex = generatedText.indexOf('{');
    const jsonEndIndex = generatedText.lastIndexOf('}') + 1;
    const jsonString = generatedText.substring(jsonStartIndex, jsonEndIndex);
    
    const analysisData = JSON.parse(jsonString);
    
    res.json(analysisData);
  } catch (error: any) {
    console.error("Error analyzing tweet:", error.response?.data || error);
    res.status(500).json({ error: "Error analyzing tweet" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
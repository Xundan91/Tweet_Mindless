const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
const { TwitterApi } = require("twitter-api-v2");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const twitterClient = new TwitterApi({
  appKey: process.env.APPKEY,
  appSecret: process.env.APPSECRET,
  accessToken: process.env.ACCESSTOKEN,
  accessSecret: process.env.ACCESSSECRET,
});

app.post("/generate-tweets", async (req, res) => {
  try {
    const { prompt, tone } = req.body;
    const systemPrompt = `Generate 4 engaging tweets in ${tone} tone based on this prompt: ${prompt}. Format output as a list of tweets without numbering.`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: systemPrompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    const generatedText = response.data.candidates[0].content.parts[0].text;
    console.log(generatedText);

    const tweets = generatedText
      .split("\n")
      .filter(text => text.trim() !== "")
      .slice(0, 4)
      .map((text, index) => ({ id: index + 1, text: text.trim() }));

    res.json({ tweets });
  } catch (error) {
    console.error("Error generating tweets:", error.response?.data || error);
    res.status(500).json({ error: "Error generating tweets" });
  }
});

app.post("/post-tweet", async (req, res) => {
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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

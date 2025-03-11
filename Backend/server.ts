import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import { TwitterApi } from "twitter-api-v2";
import multer from "multer";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed') as any);
    }
  }
});

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const twitterClient = new TwitterApi({
  appKey: process.env.APPKEY as string,
  appSecret: process.env.APPSECRET as string,
  accessToken: process.env.ACCESSTOKEN as string,
  accessSecret: process.env.ACCESSSECRET as string,
});

// Helper function to encode image to base64
const encodeImageToBase64 = (imagePath: string): string => {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString('base64');
};

app.post("/generate-tweets", upload.single('image'), async (req:any, res:any) => {
  try {
    const prompt = req.body.prompt;
    const tone = req.body.tone;
    
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    let systemPrompt = `Generate exactly 4 engaging tweets in a ${tone} tone based on the following prompt: "${prompt}".  
Each tweet should be concise, engaging, and suitable for posting on Twitter. Do not include any extra text, explanations, numbers, or formatting.  
Output only the tweets, each separated by a newline.`;

    let requestData: any = {
      contents: [{ parts: [{ text: systemPrompt }] }]
    };

    // Add image to request if provided
    if (req.file) {
      const imageBase64 = encodeImageToBase64(req.file.path);
      const mimeType = req.file.mimetype;
      
      systemPrompt += ` Incorporate relevant details from the provided image while keeping the tweets engaging and concise. Ensure that only 4 tweets are generated with no additional text.`;
      
      requestData = {
        contents: [{
          parts: [
            { text: systemPrompt },
            {
              inline_data: {
                mime_type: mimeType,
                data: imageBase64
              }
            }
          ]
        }]
      };
    }

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      requestData,
      { headers: { "Content-Type": "application/json" } }
    );

    const generatedText = response.data.candidates[0].content.parts[0].text;
    
    const tweets = generatedText
      .split("\n")
      .filter((text: string) => text.trim() !== "")
      .slice(0, 4)
      .map((text: string, index: number) => ({ id: index + 1, text: text.trim() }));

    // Clean up uploaded image after processing
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    res.json({ tweets });
  } catch (error: any) {
    console.error("Error generating tweets:", error.response?.data || error);
    
    // Clean up uploaded image in case of error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ error: "Error generating tweets" });
  }
});


app.post("/post-tweet", upload.single('image'), async (req:any, res:any) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Tweet text is required" });

    let tweet;

    // Post tweet with or without media
    if (req.file) {
      // Upload media to Twitter
      const mediaId = await twitterClient.v1.uploadMedia(req.file.path);
      
      // Post tweet with media
      tweet = await twitterClient.v2.tweet(text, {
        media: { media_ids: [mediaId] }
      });
      
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);
    } else {
      // Post text-only tweet
      tweet = await twitterClient.v2.tweet(text);
    }

    console.log("Tweet posted successfully!", tweet);
    res.json({ message: "Tweet posted successfully!", tweet });
  } catch (error) {
    console.error("Error posting tweet:", error);
    
    // Clean up uploaded image in case of error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ error: "Error posting tweet" });
  }
});

app.post("/analyze-tweet", upload.single("image"), async (req: any, res: any) => {
  try {
    const { text, tone } = req.body;
    if (!text) return res.status(400).json({ error: "Tweet text is required" });

    let systemPrompt = `
      Analyze the following tweet: "${text}"
      
      Evaluate its potential performance on Twitter based on engagement metrics, predicted audience reaction, and possible optimization strategies. Consider factors such as virality, emotional impact, readability, and engagement potential.

      If an image is provided, incorporate relevant insights from the image into your analysis. Assess how the image contributes to the tweet’s engagement and virality.
      
      Your response must be structured in the following JSON format:
      {
        "engagementMetrics": {
          "viralProbability": number,
          "likeabilityScore": number,
          "retweetPotential": number
        },
        "predictedPerformance": {
          "expectedLikes": { "min": number, "max": number },
          "expectedRetweets": { "min": number, "max": number },
          "expectedComments": { "min": number, "max": number }
        },
        "sentimentAnalysis": {
          "overallSentiment": string,
          "emotion": string
        },
        "readabilityScore": number,
        "optimizationSuggestions": [
          {
            "title": string,
            "description": string,
            "action": string
          }
        ]
      }
      
      **Important:** Only return valid JSON, without extra text or explanations.
    `;

    let requestData: any = { contents: [{ parts: [{ text: systemPrompt }] }] };

    // If image is provided, encode it and include in the request
    
    if (req.file) {
      const imageBase64 = encodeImageToBase64(req.file.path);
      const mimeType = req.file.mimetype;

      requestData.contents[0].parts.push({
        inline_data: {
          mime_type: mimeType,
          data: imageBase64,
        },
      });

      systemPrompt += ` The tweet contains an image. Include insights on how the image enhances or detracts from the tweet's effectiveness.`;
    }

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      requestData,
      { headers: { "Content-Type": "application/json" } }
    );

    const generatedText = response.data.candidates[0].content.parts[0].text;
    
    // Extract JSON from response
    const jsonStartIndex = generatedText.indexOf("{");
    const jsonEndIndex = generatedText.lastIndexOf("}") + 1;
    const jsonString = generatedText.substring(jsonStartIndex, jsonEndIndex);
    const analysisData = JSON.parse(jsonString);

    // Clean up uploaded image after processing
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    res.json(analysisData);
  } catch (error: any) {
    console.error("Error analyzing tweet:", error.response?.data || error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ error: "Error analyzing tweet" });
  }
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
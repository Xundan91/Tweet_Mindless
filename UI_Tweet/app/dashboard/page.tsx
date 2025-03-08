"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Clock, Send, Calendar, X } from "lucide-react";
import { DashboardNav } from "@/components/dashboard-nav";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast"; // Import useToast

interface Tweet {
  id: number;
  text: string;
}

export default function Dashboard() {
  const { toast } = useToast(); // Use the useToast hook

  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [tone, setTone] = useState("casual");
  const [prompt, setPrompt] = useState("");

  const postTweet = async (tweet: Tweet) => {
    try {
      const response = await fetch("https://tweet-mindless.onrender.com/post-tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: tweet.text }),
      });

      if (!response.ok) throw new Error("Failed to post tweet");

      const data = await response.json();
      toast({
        title: "Tweet Posted!",
        description: "Your tweet was posted successfully.",
      });
    } catch (error) {
      console.error("Error posting tweet:", error);
      toast({
        title: "Error",
        description: "Failed to post tweet.",
        variant: "destructive",
      });
    }
  };

  const generateTweet = async () => {
    if (!prompt) return toast({ title: "Error", description: "Enter a prompt!", variant: "destructive" });

    try {
      const response = await fetch("https://tweet-mindless.onrender.com/generate-tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, tone }),
      });

      if (!response.ok) throw new Error("Failed to generate tweets");

      const data = await response.json();
      if (data.tweets) setTweets(data.tweets);
    } catch (error) {
      console.error("Error generating tweet:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        <Toaster />
        <div className="max-w-3xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Tweet Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter your tweet prompt..."
                className="min-h-[100px]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="flex items-center gap-4">
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="hinglish">Hinglish</SelectItem>
                    <SelectItem value="funny">Funny</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="ml-auto" onClick={generateTweet}>
                  <Bot className="mr-2 h-4 w-4" />
                  Generate
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {tweets.map((tweet) => (
              <Card key={tweet.id}>
                <CardContent className="p-4">
                  <p className="text-muted-foreground mb-4">{tweet.text}</p>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => postTweet(tweet)}>
                      <Send className="mr-2 h-4 w-4" />
                      Post Now
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule
                    </Button>
                    <Button size="sm" variant="outline">
                      <Clock className="mr-2 h-4 w-4" />
                      Auto-Tweet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

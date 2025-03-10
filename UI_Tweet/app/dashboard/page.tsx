"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Bot, Clock, Send, Calendar, Sparkles, BarChart, Edit2, ChevronRight, Image, Smile, Globe2 } from "lucide-react";
import { DashboardNav } from "@/components/dashboard-nav";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Tweet {
  id: number;
  text: string;
}

interface EngagementMetrics {
  viralProbability: number;
  likeabilityScore: number;
  retweetPotential: number;
}

interface PredictedRange {
  min: number;
  max: number;
}

interface PredictedPerformance {
  expectedLikes: PredictedRange;
  expectedRetweets: PredictedRange;
  expectedComments: PredictedRange;
}

interface OptimizationSuggestion {
  title: string;
  description: string;
  action: string;
}

interface TweetAnalysis {
  engagementMetrics: EngagementMetrics;
  predictedPerformance: PredictedPerformance;
  optimizationSuggestions: OptimizationSuggestion[];
}

export default function Dashboard() {
  const { toast } = useToast();
  const [tone, setTone] = useState("casual");
  const [prompt, setPrompt] = useState("");
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [editableContent, setEditableContent] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tweetAnalysis, setTweetAnalysis] = useState<TweetAnalysis | null>(null);

  const postTweet = async (tweet: string) => {
    try {
      setIsGenerating(true);
      const response = await fetch("https://tweet-mindless.onrender.com/post-tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: tweet }),
      });

      if (!response.ok) throw new Error("Failed to post tweet");

      await response.json();
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
    } finally {
      setIsGenerating(false);
    }
  };

  const generateTweet = async () => {
    if (!prompt) {
      return toast({ 
        title: "Error", 
        description: "Enter a prompt!", 
        variant: "destructive" 
      });
    }

    try {
      setIsGenerating(true);
      const response = await fetch("https://tweet-mindless.onrender.com/generate-tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, tone }),
      });

      if (!response.ok) throw new Error("Failed to generate tweets");

      const data = await response.json();
      if (data.tweets) {
        setTweets(data.tweets);
        setEditableContent(data.tweets.map((tweet: Tweet) => tweet.text));
      }
    } catch (error) {
      console.error("Error generating tweet:", error);
      toast({
        title: "Error",
        description: "Failed to generate tweets. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };


  const analyzeTweet = async (tweetText: string) => {
    if (!tweetText) {
      return toast({
        title: "Error",
        description: "Enter a tweet to analyze!",
        variant: "destructive"
      });
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch("https://tweet-mindless.onrender.com/analyze-tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: tweetText, tone }),
      });

      if (!response.ok) throw new Error("Failed to analyze tweet");

      const analysisData = await response.json();
      setTweetAnalysis(analysisData);
      
      toast({
        title: "Analysis Complete",
        description: "Tweet analysis has been completed successfully.",
      });
    } catch (error) {
      console.error("Error analyzing tweet:", error);
      toast({
        title: "Error",
        description: "Failed to analyze tweet.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatNumber = (num: number) => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}K` : num.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="container mx-auto px-4 py-8">
        <Toaster />
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Tweet Generator</h1>
              <p className="text-muted-foreground">Create engaging tweets with AI assistance</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard/history">
                <Button variant="outline" size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  History
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </Button>
            </div>
          </div>

          <Tabs defaultValue="generate" className="mb-8">
            <TabsList className="w-full flex gap-2 bg-transparent mb-8 p-1 border rounded-lg">
              <TabsTrigger value="generate" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all">
                <Bot className="mr-2 h-5 w-5" />
                Generate
              </TabsTrigger>
              <TabsTrigger value="analyze" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all">
                <BarChart className="mr-2 h-5 w-5" />
                Analyze
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generate">
              <div>
                <div className="space-y-6">
                  <Card className="border-2 border-primary/10">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className="h-10 w-10">
                          <img src="https://github.com/shadcn.png" alt="Profile" />
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder="What would you like to tweet about?"
                            className="min-h-[120px] text-lg resize-none border-none focus-visible:ring-0 p-0 bg-transparent"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                          />
                          <div className="flex items-center gap-4 mt-4 border-t pt-4">
                            <Button variant="ghost" size="sm">
                              <Image className="h-5 w-5 text-primary" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Smile className="h-5 w-5 text-primary" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Globe2 className="h-5 w-5 text-primary" />
                            </Button>
                            <div className="ml-auto flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Tone:</span>
                                <div className="w-32">


                                <Select value={tone} onValueChange={setTone}>
                                  <SelectTrigger className="h-8">
                                    <SelectValue placeholder="Select tone" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="casual">🌟 Casual</SelectItem>
                                    <SelectItem value="trending">🔥 Trending</SelectItem>
                                    <SelectItem value="hinglish">🇮🇳 Hinglish</SelectItem>
                                    <SelectItem value="funny">😄 Funny</SelectItem>
                                    <SelectItem value="formal">👔 Formal</SelectItem>
                                  </SelectContent>
                                </Select>
                                </div>
                              </div>
                              <Button 
                                size="sm" 
                                onClick={generateTweet}
                                disabled={isGenerating || !prompt}
                              >
                                {isGenerating ? (
                                  <>
                                    <Bot className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Generate
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    {tweets.length > 0 && <h2 className="text-xl font-semibold">Generated Tweets</h2>}
                    {tweets.map((tweet, index) => (
                      <Card key={tweet.id} className="group hover:border-primary/30 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-10 w-10">
                              <img src="https://github.com/shadcn.png" alt="Profile" />
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div>
                                  <span className="font-semibold">John Doe</span>
                                  <span className="text-muted-foreground ml-2">@johndoe</span>
                                </div>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="relative">
                                <Textarea
                                  value={editableContent[index] || tweet.text}
                                  onChange={(e) => {
                                    const newContent = [...editableContent];
                                    newContent[index] = e.target.value;
                                    setEditableContent(newContent);
                                  }}
                                  className="text-lg leading-relaxed bg-transparent border-none focus-visible:ring-0 px-0 w-full resize-none overflow-hidden"
                                  style={{ minHeight: "80px", height: "auto" }}
                                  rows={3}
                                />
                              </div>
                              <div className="flex items-center gap-3 mt-4">
                                <Button 
                                  size="sm" 
                                  variant="default" 
                                  className="bg-primary/10 hover:bg-primary/20 text-primary"
                                  onClick={() => postTweet(editableContent[index] || tweet.text)}
                                >
                                  <Send className="mr-2 h-4 w-4" />
                                  Post Now
                                </Button>
                                <Button size="sm" variant="outline" className="hover:border-primary/30">
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Schedule
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analyze">
              <div>
                <div className="space-y-6">
                  <Card className="border-2 border-primary/10">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-6">
                        <Avatar className="h-10 w-10">
                          <img src="https://github.com/shadcn.png" alt="Profile" />
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder="Enter a tweet to analyze..."
                            className="min-h-[120px] text-lg resize-none border-none focus-visible:ring-0 p-0 bg-transparent"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                          />
                          <div className="flex items-center gap-4 mt-4 border-t pt-4">
                            <Button variant="ghost" size="sm">
                              <Image className="h-5 w-5 text-primary" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Smile className="h-5 w-5 text-primary" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Globe2 className="h-5 w-5 text-primary" />
                            </Button>
                            <div className="ml-auto flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Tone:</span>
                                <div className="w-32">
                                <Select value={tone} onValueChange={setTone}>
                                  <SelectTrigger className="h-8">
                                    <SelectValue placeholder="Select tone" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="casual">🌟 Casual</SelectItem>
                                    <SelectItem value="trending">🔥 Trending</SelectItem>
                                    <SelectItem value="hinglish">🇮🇳 Hinglish</SelectItem>
                                    <SelectItem value="funny">😄 Funny</SelectItem>
                                    <SelectItem value="formal">👔 Formal</SelectItem>
                                  </SelectContent>
                                </Select>
                                </div>
                              </div>
                              <Button 
                                size="sm"
                                onClick={() => analyzeTweet(prompt)}
                                disabled={isAnalyzing || !prompt}
                              >
                                {isAnalyzing ? (
                                  <>
                                    <BarChart className="mr-2 h-4 w-4 animate-spin" />
                                    Analyzing...
                                  </>
                                ) : (
                                  <>
                                    <BarChart className="mr-2 h-4 w-4" />
                                    Analyze
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {tweetAnalysis && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Engagement Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-2">
                                <span>Viral Probability</span>
                                <span className="font-semibold">{tweetAnalysis.engagementMetrics.viralProbability}%</span>
                              </div>
                              <div className="h-2 bg-primary/20 rounded-full">
                                <div 
                                  className="h-full bg-primary rounded-full" 
                                  style={{ width: `${tweetAnalysis.engagementMetrics.viralProbability}%` }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-2">
                                <span>Likeability Score</span>
                                <span className="font-semibold">{tweetAnalysis.engagementMetrics.likeabilityScore}%</span>
                              </div>
                              <div className="h-2 bg-primary/20 rounded-full">
                                <div 
                                  className="h-full bg-primary rounded-full" 
                                  style={{ width: `${tweetAnalysis.engagementMetrics.likeabilityScore}%` }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-2">
                                <span>Retweet Potential</span>
                                <span className="font-semibold">{tweetAnalysis.engagementMetrics.retweetPotential}%</span>
                              </div>
                              <div className="h-2 bg-primary/20 rounded-full">
                                <div 
                                  className="h-full bg-primary rounded-full" 
                                  style={{ width: `${tweetAnalysis.engagementMetrics.retweetPotential}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Predicted Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                              <span>Expected Likes</span>
                              <span className="font-semibold">
                                {formatNumber(tweetAnalysis.predictedPerformance.expectedLikes.min)} - {formatNumber(tweetAnalysis.predictedPerformance.expectedLikes.max)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                              <span>Expected Retweets</span>
                              <span className="font-semibold">
                                {formatNumber(tweetAnalysis.predictedPerformance.expectedRetweets.min)} - {formatNumber(tweetAnalysis.predictedPerformance.expectedRetweets.max)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                              <span>Expected Comments</span>
                              <span className="font-semibold">
                                {formatNumber(tweetAnalysis.predictedPerformance.expectedComments.min)} - {formatNumber(tweetAnalysis.predictedPerformance.expectedComments.max)}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {tweetAnalysis && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Optimization Suggestions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {tweetAnalysis.optimizationSuggestions.map((suggestion, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1">{suggestion.title}</h4>
                                <p className="text-muted-foreground">{suggestion.description}</p>
                              </div>
                              <Button variant="outline" size="sm">
                                {suggestion.action}
                                <ChevronRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}


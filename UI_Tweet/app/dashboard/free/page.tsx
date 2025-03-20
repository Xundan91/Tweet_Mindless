"use client";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Clock,
  Send,
  Calendar,
  Sparkles,
  BarChart,
  Edit2,
  ChevronRight,
  Image as ImageIcon,
  Smile,
  Globe2,
  X,
  Crown,
  Share2,
  ExternalLink,
} from "lucide-react";
import { DashboardNav } from "@/components/dashboard-nav";
import Link from "next/link";

import EmojiPicker from "emoji-picker-react";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  OptimizationSuggestion,
  PredictedPerformance,
  PredictedRange,
  EngagementMetrics,
  Tweet,
  TweetAnalysis,
} from "@/types/interface";
import { tweetService } from "@/services/api";
import { useImageUpload } from "@/hooks/useImageUpload";
import { AnyARecord } from "node:dns";

export default function Free() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [tone, setTone] = useState<string>("casual");
  const [prompt, setPrompt] = useState<string>("");
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [editableContent, setEditableContent] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [tweetAnalysis, setTweetAnalysis] = useState<TweetAnalysis | null>(
    null
  );
  const analyzeFileInputRef = useRef<HTMLInputElement>(null);
  const [isSharing, setIsSharing] = useState<boolean>(false);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isGlobeActive, setIsGlobeActive] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 280;

  const {
    selectedImage,
    previewUrl,
    fileInputRef,
    handleImageClick,
    handleImageChange,
    clearImage,
  } = useImageUpload();

  const analyseImageUpload = useImageUpload();
  useEffect


  useEffect(() => {
    if(status === 'authenticated'){
      const userType = session?.user?.userType
    if(userType ==='pro'){
      router.push(`/dashboard/${userType}`)
    }
    if(userType ==='premium'){
      router.push(`/dashboard/${userType}`)
    }

      if(userType !=='premium' && userType !=='pro'){

        router.push(`/dashboard/${userType}`)

      }
    }


    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleEmojiSelect = (emojiData: { emoji: string }) => {
    setPrompt((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const postTweet = async (tweet: string) => {
    try {
      setIsGenerating(true);

      await tweetService.postTweet(tweet, selectedImage || undefined);

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
        variant: "destructive",
      });
    }

    try {
      setIsGenerating(true);
      const generateTweet = await tweetService.generateTweets(
        prompt,
        tone,
        selectedImage || undefined
      );
      setTweets(generateTweet);
      setEditableContent(generateTweet.map((tweet) => tweet.text));
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
        variant: "destructive",
      });
    }

    setIsAnalyzing(true);
    try {
      const analysisData = await tweetService.analyseTweet(
        tweetText,
        selectedImage || undefined
      );

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

  // Function to share tweet on Twitter/X
  const shareOnTwitter = async (text: string) => {
    setIsSharing(true);
  
    // Encode the tweet text for URL
    const encodedText = encodeURIComponent(text);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
  
    if (previewUrl) {
      try {
        // Fetch image as blob
        const response = await fetch(previewUrl);
        const blob = await response.blob();
        const item = new ClipboardItem({ [blob.type]: blob });
  
        // Copy image to clipboard
        await navigator.clipboard.write([item]);
  
        toast({
          title: "Image Copied!",
          description: "Now, press Ctrl + V in Twitter to paste your image.",
          duration: 4000,
        });
      } catch (error) {
        console.error("Failed to copy image:", error);
        toast({
          title: "Clipboard Error",
          description: "Couldn't copy the image. Please upload it manually.",
          duration: 4000,
        });
      }
    }
  
    // Open Twitter in a new tab

  setTimeout(()=>{

    window.open(twitterUrl, "_blank");
  },5000)
  
    setTimeout(() => {
      setIsSharing(false);
      toast({
        title: " Redirected to X ",
        description: "Your tweet content has been sent to X for posting.",
      });
    }, 3000);
  };
  




  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="container mx-auto px-4 py-8">
        <Toaster />
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                Tweet Generator
              </h1>
              <div className="flex items-center">
                <p className="text-muted-foreground">
                  Create engaging tweets with AI assistance
                </p>
                <Badge
                  variant="outline"
                  className="ml-2 bg-primary/10 text-primary"
                >
                  <Crown className="mr-1 h-3 w-3" /> Free Plan
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="opacity-70"
              >
                <Clock className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">History</span>
                <Crown className="ml-1 h-3 w-3 text-yellow-500" />
              </Button>
              <Link href="/pricing">
                <Button variant="default" size="sm">
                  <Crown className="mr-2 h-4 w-4" />
                  <span>Upgrade</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Free Plan Usage Banner */}
          <Card className="mb-6 bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center mb-3 sm:mb-0">
                <Crown className="h-5 w-5 text-yellow-500 mr-2" />
                <span>
                  Free plan
                </span>
              </div>
              <Link href="/pricing">
                <Button size="sm" variant="outline">
                  Upgrade for unlimited access
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Tabs defaultValue="generate" className="mb-8">
            <TabsList className="w-full flex gap-2 bg-transparent mb-8 p-1 border rounded-lg">
              <TabsTrigger
                value="generate"
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all"
              >
                <Bot className="sm:mr-2 h-5 w-5" />
                <span className="hidden sm:inline">Generate</span>
              </TabsTrigger>
              <TabsTrigger
                value="analyze"
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all"
              >
                <BarChart className="sm:mr-2 h-5 w-5" />
                <span className="hidden sm:inline">Analyze</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generate">
              <div>
                <div className="space-y-6">
                  <Card className="border-2 border-primary/10">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
                        <Avatar className="h-10 w-10 hidden sm:flex">
                          <img
                            src="https://github.com/shadcn.png"
                            alt="Profile"
                          />
                        </Avatar>
                        <div className="flex-1 w-full">
                          <Textarea
                            placeholder="What would you like to tweet about?"
                            className="min-h-[120px] text-lg resize-none border-none focus-visible:ring-0 p-0 bg-transparent"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                          />

                          {previewUrl && (
                            <div className="mt-4 relative rounded-lg overflow-hidden border">
                              <img
                                src={previewUrl}
                                alt="Selected"
                                className="max-h-64 w-auto object-contain mx-auto"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2 p-1 h-8 w-8 bg-black/50 hover:bg-black/70 text-white rounded-full"
                                onClick={clearImage}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4 border-t pt-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleImageClick}
                              >
                                <ImageIcon className="h-5 w-5 text-primary" />
                              </Button>
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setShowEmojiPicker(!showEmojiPicker)
                                }
                              >
                                <Smile className="h-5 w-5 text-primary" />
                              </Button>
                              {showEmojiPicker && (
                                <div className="absolute z-50 mt-2">
                                  <EmojiPicker
                                    onEmojiClick={handleEmojiSelect}
                                  />
                                </div>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsGlobeActive(!isGlobeActive)}
                              >
                                <Globe2
                                  className={`h-5 w-5 transition-colors duration-300 ${
                                    isGlobeActive
                                      ? "text-blue-500"
                                      : "text-primary"
                                  }`}
                                />
                              </Button>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:ml-auto sm:justify-end">
                              <div className="flex items-center gap-2 w-full sm:w-auto">
                                <span className="text-sm font-medium">
                                  Tone:
                                </span>
                                <div className="w-full sm:w-32">
                                  <Select value={tone} onValueChange={setTone}>
                                    <SelectTrigger className="h-8">
                                      <SelectValue placeholder="Select tone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="casual">
                                        🌟 Casual
                                      </SelectItem>
                                      <SelectItem value="trending">
                                        🔥 Trending
                                      </SelectItem>
                                      <SelectItem value="hinglish">
                                        🇮🇳 Hinglish
                                      </SelectItem>
                                      <SelectItem
                                        disabled
                                        value="funny"
                                        className="opacity-50"
                                      >
                                        😄 Funny (Premium)
                                      </SelectItem>
                                      <SelectItem
                                        disabled
                                        value="formal"
                                        className="opacity-50"
                                      >
                                        👔 Formal (Premium)
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                onClick={generateTweet}
                                disabled={isGenerating || !prompt}
                                className="w-full sm:w-auto"
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
                    {tweets.length > 0 && (
                      <h2 className="text-xl font-semibold">
                        Generated Tweets
                      </h2>
                    )}
                    {tweets.map((tweet, index) => (
                      <Card
                        key={tweet.id}
                        className="group hover:border-primary/30 transition-all duration-300"
                      >
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row items-start gap-4">
                            <Avatar className="h-10 w-10 hidden sm:flex">
                              <img
                                src="https://github.com/shadcn.png"
                                alt="Profile"
                              />
                            </Avatar>
                            <div className="flex-1 w-full">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div>
                                  <span className="font-semibold">
                                    John Doe
                                  </span>
                                  <span className="text-muted-foreground ml-2">
                                    @johndoe
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
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
                              {previewUrl && (
                                <div className="mt-2 mb-4 rounded-lg overflow-hidden border">
                                  <img
                                    src={previewUrl}
                                    alt="Tweet image"
                                    className="max-h-64 w-auto object-contain mx-auto"
                                  />
                                </div>
                              )}
                              <div className="flex flex-wrap items-center gap-3 mt-4">
                                <Button
                                  size="sm"
                                  variant="default"
                                  className="bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 transform hover:scale-105"
                                  onClick={() =>
                                    postTweet(
                                      editableContent[index] || tweet.text
                                    )
                                  }
                                >
                                  <Send className="mr-2 h-4 w-4" />
                                  Post Now
                                </Button>

                                {/* New Share on X Button */}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-blue-400 text-blue-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-500 transition-all duration-300 transform hover:scale-105"
                                  onClick={() =>
                                    shareOnTwitter(
                                      editableContent[index] || tweet.text
                                    )
                                  }
                                  disabled={isSharing}
                                >
                                  {isSharing ? (
                                    <>
                                      <X className="mr-2 h-4 w-4 animate-pulse" />
                                      Sharing...
                                    </>
                                  ) : (
                                    <>
                                      <Share2 className="mr-2 h-4 w-4" />
                                      Share on X
                                    </>
                                  )}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="hover:border-primary/30 opacity-70"
                                  disabled={true}
                                  title="Available in premium plan"
                                >
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Schedule
                                  <Crown className="ml-1 h-3 w-3 text-yellow-500" />
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
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                        <Avatar className="h-10 w-10 hidden sm:flex">
                          <img
                            src="https://github.com/shadcn.png"
                            alt="Profile"
                          />
                        </Avatar>
                        <div className="flex-1 w-full">
                          <Textarea
                            placeholder="Enter a tweet to analyze..."
                            className="min-h-[120px] text-lg resize-none border-none focus-visible:ring-0 p-0 bg-transparent"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                          />

                          {previewUrl && (
                            <div className="mt-4 relative rounded-lg overflow-hidden border">
                              <img
                                src={previewUrl}
                                alt="Selected"
                                className="max-h-64 w-auto object-contain mx-auto"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2 p-1 h-8 w-8 bg-black/50 hover:bg-black/70 text-white rounded-full"
                                onClick={clearImage}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4 border-t pt-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleImageClick}
                              >
                                <ImageIcon className="h-5 w-5 text-primary" />
                              </Button>
                              <input
                                type="file"
                                ref={analyzeFileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                              />
                              <Button variant="ghost" size="sm">
                                <Smile className="h-5 w-5 text-primary" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Globe2 className="h-5 w-5 text-primary" />
                              </Button>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:ml-auto sm:justify-end">
                              <Button
                                size="sm"
                                onClick={() => analyzeTweet(prompt)}
                                disabled={isAnalyzing || !prompt}
                                className="w-full sm:w-auto"
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
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Engagement Metrics Card - Blurred */}
                        <Card className="relative">
                          <CardHeader className="p-4 sm:p-6">
                            <CardTitle className="text-lg">
                              Engagement Prediction
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 sm:p-6 pt-0">
                            <div className="space-y-4 blur-sm">
                              <div>
                                <div className="flex justify-between mb-2">
                                  <span>Viral Probability</span>
                                  <span className="font-semibold">
                                    {tweetAnalysis.engagementMetrics
                                      .viralProbability * 10}
                                    %
                                  </span>
                                </div>
                                <div className="h-2 bg-primary/20 rounded-full">
                                  <div
                                    className="h-full bg-primary rounded-full"
                                    style={{
                                      width: `${
                                        tweetAnalysis.engagementMetrics
                                          .viralProbability * 10
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between mb-2">
                                  <span>Likeability Score</span>
                                  <span className="font-semibold">
                                    {tweetAnalysis.engagementMetrics
                                      .likeabilityScore * 10}
                                    %
                                  </span>
                                </div>
                                <div className="h-2 bg-primary/20 rounded-full">
                                  <div
                                    className="h-full bg-primary rounded-full"
                                    style={{
                                      width: `${
                                        tweetAnalysis.engagementMetrics
                                          .likeabilityScore * 10
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between mb-2">
                                  <span>Retweet Potential</span>
                                  <span className="font-semibold">
                                    {
                                      tweetAnalysis.engagementMetrics
                                        .retweetPotential
                                    }
                                    %
                                  </span>
                                </div>
                                <div className="h-2 bg-primary/20 rounded-full">
                                  <div
                                    className="h-full bg-primary rounded-full"
                                    style={{
                                      width: `${tweetAnalysis.engagementMetrics.retweetPotential}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>

                            {/* Upgrade Overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-lg">
                              <Crown className="h-10 w-10 text-yellow-500 mb-2" />
                              <h3 className="font-semibold text-lg mb-2">
                                Premium Feature
                              </h3>
                              <p className="text-sm text-muted-foreground text-center mb-3 px-4">
                                Unlock detailed engagement metrics
                              </p>
                              <Link href="/pricing">
                                <Button size="sm">Upgrade to Premium</Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Predicted Performance Card - Blurred */}
                        <Card className="relative">
                          <CardHeader className="p-4 sm:p-6">
                            <CardTitle className="text-lg">
                              Predicted Performance
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 sm:p-6 pt-0">
                            <div className="space-y-4 blur-sm">
                              <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                                <span>Expected Likes</span>
                                <span className="font-semibold">
                                  {formatNumber(
                                    tweetAnalysis.predictedPerformance
                                      .expectedLikes.min
                                  )}{" "}
                                  -{" "}
                                  {formatNumber(
                                    tweetAnalysis.predictedPerformance
                                      .expectedLikes.max
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                                <span>Expected Retweets</span>
                                <span className="font-semibold">
                                  {formatNumber(
                                    tweetAnalysis.predictedPerformance
                                      .expectedRetweets.min
                                  )}{" "}
                                  -{" "}
                                  {formatNumber(
                                    tweetAnalysis.predictedPerformance
                                      .expectedRetweets.max
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                                <span>Expected Comments</span>
                                <span className="font-semibold">
                                  {formatNumber(
                                    tweetAnalysis.predictedPerformance
                                      .expectedComments.min
                                  )}{" "}
                                  -{" "}
                                  {formatNumber(
                                    tweetAnalysis.predictedPerformance
                                      .expectedComments.max
                                  )}
                                </span>
                              </div>
                            </div>

                            {/* Upgrade Overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-lg">
                              <Crown className="h-10 w-10 text-yellow-500 mb-2" />
                              <h3 className="font-semibold text-lg mb-2">
                                Premium Feature
                              </h3>
                              <p className="text-sm text-muted-foreground text-center mb-3 px-4">
                                Unlock performance predictions
                              </p>
                              <Link href="/pricing">
                                <Button size="sm">Upgrade to Premium</Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700 mt-6">
                        <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-center">
                          <div className="mb-4 sm:mb-0">
                            <h3 className="font-semibold flex items-center text-lg text-gray-200">
                              <Crown className="h-5 w-5 text-yellow-500 mr-2" />
                              Get The Complete Picture
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">
                              Upgrade to premium for competitor analysis,
                              audience insights, and advanced AI predictions
                            </p>
                          </div>
                          <Link href="/pricing">
                            <Button>
                              Upgrade Now
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </>
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

"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardNav } from "@/components/dashboard-nav";
import { ArrowLeft, MessageSquare, Repeat2, Heart, BarChart, Bot, Star, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const historyData = [
  {
    prompt: "Write a tweet about artificial intelligence",
    icon: <Bot className="h-5 w-5 text-blue-500" />,
    options: [  
      {   
        content: "🤖 AI isn't just changing the game - it's creating entirely new ones! From healthcare to space exploration, we're witnessing a revolution in human potential. What field do you think AI will transform next? #AI #FutureOfTech",
        metrics: {
          likes: "2.1K",
          retweets: "856",
          replies: "234"
        },
        selected: true,
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />
      },
      {
        content: "Artificial Intelligence: Where machines learn and humans lead. Together, we're building a future that was once pure sci-fi. #AI #Innovation",
        metrics: null,
        selected: false,
        icon: <Star className="h-5 w-5 text-yellow-500" />
      },
      {
        content: "Just had a fascinating chat with an AI. It's amazing how far we've come, but remember - AI is a tool, not a replacement for human creativity! #TechTalk",
        metrics: null,
        selected: false,
        icon: <Star className="h-5 w-5 text-yellow-500" />
      },
      {
        content: "The real power of AI lies not in replacing humans, but in augmenting our capabilities. What's your take on this technological evolution? #AIDiscussion",
        metrics: null,
        selected: false,
        icon: <Star className="h-5 w-5 text-yellow-500" />
      }
    ]
  },
  {
    prompt: "Create a tweet about remote work culture",
    icon: <Bot className="h-5 w-5 text-purple-500" />,
    options: [
      {
        content: "Remote work isn't just a trend - it's a transformation of how we think about productivity and work-life balance. What's your favorite part of WFH? 🏠💻 #RemoteWork",
        metrics: {
          likes: "1.8K",
          retweets: "643",
          replies: "189"
        },
        selected: true,
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />
      },
      {
        content: "The office is wherever inspiration strikes! Whether it's your cozy home setup or a local café, remote work gives us the freedom to choose. #WFHLife",
        metrics: null,
        selected: false,
        icon: <Star className="h-5 w-5 text-yellow-500" />
      },
      {
        content: "Building culture in a remote world: It's not about location, it's about connection. How do you stay connected with your remote team? #RemoteWork",
        metrics: null,
        selected: false,
        icon: <Star className="h-5 w-5 text-yellow-500" />
      },
      {
        content: "From pajama meetings to global collaboration - remote work has changed the game forever! What's your remote work story? #FutureOfWork",
        metrics: null,
        selected: false,
        icon: <Star className="h-5 w-5 text-yellow-500" />
      }
    ]
  }
];

export default function History() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold mb-2">Tweet History</h1>
              <p className="text-muted-foreground">Your previous tweet generations and their performance</p>
            </div>
          </div>

          <div className="space-y-8">
            {historyData.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-muted/30 flex flex-row items-center gap-3">
                  {item.icon}
                  <CardTitle className="text-xl">
                    <span className="text-muted-foreground font-normal">Prompt:</span> {item.prompt}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4">
                    {item.options.map((option, optIndex) => (
                      <Card
                        key={optIndex}
                        className={`overflow-hidden transition-all duration-300 hover:border-primary/30 ${
                          option.selected ? "border-2 border-primary" : ""
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3 mb-4">
                            {option.icon}
                            <p className="text-lg">{option.content}</p>
                          </div>
                          <div className="flex items-center gap-6">
                            {option.metrics ? (
                              <>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Heart className="h-4 w-4" />
                                  <span>{option.metrics.likes}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Repeat2 className="h-4 w-4" />
                                  <span>{option.metrics.retweets}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>{option.metrics.replies}</span>
                                </div>
                                <Button size="sm" variant="outline" className="ml-auto">
                                  <BarChart className="mr-2 h-4 w-4" />
                                  View Analytics
                                </Button>
                              </>
                            ) : (
                              <span className="text-sm text-muted-foreground">Not posted</span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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
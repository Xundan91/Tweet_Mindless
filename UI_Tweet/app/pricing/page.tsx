"use client"; // If using App Router

import { Button } from "@/components/ui/button";
import { DashboardNav } from "@/components/dashboard-nav";
import { Check } from "lucide-react";

export default function Pricing() {
  

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground">Choose the plan that best fits your needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card p-8 rounded-lg border">
            <h2 className="text-2xl font-bold mb-2">Basic</h2>
            <p className="text-4xl font-bold mb-6">Free</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-green-500" />
                5 tweets per month
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-green-500" />
                Basic AI generation
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-green-500" />
                Manual posting
              </li>
            </ul>
            <Button className="w-full" variant="outline">Get Started</Button>
          </div>

          <div className="bg-card p-8 rounded-lg border-2 border-primary relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm">
              Most Popular
            </div>
            <h2 className="text-2xl font-bold mb-2">Medium</h2>
            <p className="text-4xl font-bold mb-6">$5/mo</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-green-500" />
                90 tweets per month
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-green-500" />
                Advanced AI generation
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-green-500" />
                Limited auto-tweeting
              </li>
            </ul>
            {/* Integrate Razorpay here */}
            <Button className="w-full">
              Subscribe Now
            </Button>
          </div>

          <div className="bg-card p-8 rounded-lg border">
            <h2 className="text-2xl font-bold mb-2">Ultimate</h2>
            <p className="text-4xl font-bold mb-6">$15/mo</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-green-500" />
                Unlimited tweets
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-green-500" />
                Premium AI features
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-green-500" />
                Full automation
              </li>
            </ul>
            {/* Integrate Razorpay here */}
            <Button className="w-full" variant="outline">
              Subscribe Now
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

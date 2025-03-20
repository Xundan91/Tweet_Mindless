"use client";

import { Button } from "@/components/ui/button";
import { DashboardNav } from "@/components/dashboard-nav";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "Free",
    features: [
      "10 Tweet Generation",
      "Basic AI generation",
      "Add 1 Image in tweet",
      "Up to 3 Tones",
      "Share option",
      "No History Access",
      "No Analyze Access",
    ],
    button: { text: "Get Started", variant: "outline" },
  },
  {
    name: "Medium",
    price: "$5/mo",
    popular: true,
    features: [
      "100+ Generations",
      "Advanced AI generation",
      "Analyze Tweet",
      "Add Multiple Images",
      "History Access",
      "More than 5+ Tones",
    ],
    button: { text: "Subscribe Now" },
  },
  {
    name: "Ultimate",
    price: "$15/mo",
    features: [
      "Unlimited tweets",
      "Premium AI features",
      "Recommendation & Analysis",
      "History Access",
      "More than 10 Tones",
      "Can Add Multiple Images",
      "Schedule Tweet Time",
    ],
    button: { text: "Subscribe Now", variant: "outline" },
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground mb-12">Choose the plan that fits your needs</p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map(({ name, price, features, button, popular }, i) => (
            <div key={i} className={`bg-card p-8 rounded-lg border ${popular ? "border-2 border-primary relative" : ""}`}>
              {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm">
                  Most Popular
                </div>
              )}
              <h2 className="text-2xl font-bold mb-2">{name}</h2>
              <p className="text-4xl font-bold mb-6">{price}</p>
              <ul className="space-y-4 mb-8">
                {features.map((feature, j) => (
                  <li key={j} className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">{button.text}</Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

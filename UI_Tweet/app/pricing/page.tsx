"use client";

import { Button } from "@/components/ui/button";
import { DashboardNav } from "@/components/dashboard-nav";
import { Check } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Script from "next/script";

// Declare Razorpay as a global type
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Pricing() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if Razorpay script is already loaded
    if (window.Razorpay) {
      setScriptLoaded(true);
    }
  }, []);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  async function handleplanclick(planname: string) {
    if (status !== "authenticated") {
      router.push('/auth/signin');
      return;
    }

    const userType = session?.user?.userType;
    
    if (planname === 'Basic') {
      router.push(`/dashboard/${userType}`);
      return;
    }
    
    try {
      // Create order
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planName: planname }),
      });

      const orderData = await orderResponse.json();
      
      if (!orderData.OrderId) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      if (!scriptLoaded || !window.Razorpay) {
        alert("Payment gateway is still loading. Please try again in a moment.");
        return;
      }

      // Initialize Razorpay checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Tweet AI",
        description: `${planname} Plan Subscription`,
        order_id: orderData.OrderId,
        handler: async function(response: any) {
          try {
            // Verify the payment
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                planName: planname
              }),
            });

            const verifyData = await verifyResponse.json();
            
            if (verifyData.success) {
              alert("Payment successful!");
              router.push(`/dashboard/${verifyData.user.type}`);
            } else {
              throw new Error(verifyData.error || 'Payment verification failed');
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: orderData.userName,
          email: orderData.userEmail,
        },
        theme: {
          color: "#3399cc",
        },
      };
      
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Order creation error:", error);
      alert("Failed to create order. Please try again later.");
    }
  }

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

  return (
    <div className="min-h-screen bg-background">
      {/* Add the script directly to this page as well for redundancy */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={handleScriptLoad}
      />
      <DashboardNav />
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground mb-12">
          Choose the plan that fits your needs
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map(({ name, price, features, button, popular }, i) => (
            <div
              key={i}
              className={`bg-card p-8 rounded-lg border ${
                popular ? "border-2 border-primary relative" : ""
              }`}
            >
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
              <Button 
                className="w-full" 
                onClick={() => handleplanclick(name)}
              >
                {button.text}
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bot, Settings, CreditCard } from "lucide-react";
import { signOut } from "next-auth/react";

export function DashboardNav() {
  const router = useRouter();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              X Agent 
            </Link>
            <nav className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                className="flex items-center"
                onClick={() => router.push("/dashboard")}
              >
                <Bot className="mr-2 h-4 w-4" />
                Generator
              </Button>
              <Button
                variant="ghost"
                className="flex items-center"
                onClick={() => router.push("/pricing")}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Pricing
              </Button>
              <Button
                variant="ghost"
                className="flex items-center"
                onClick={() => router.push("/setup")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Setup
              </Button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => signOut()}>Logout</Button>
          </div>
        </div>
      </div>
    </header>
  );
}

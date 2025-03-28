"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardNav } from "@/components/dashboard-nav";

export default function Setup() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">X  Username</Label>
                <Input id="username" placeholder="@username" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="app-key">App Key</Label>
                <Input id="app-key" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="access-token">Access Token</Label>
                <Input id="access-token" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="access-secret">Access Token Secret</Label>
                <Input id="access-secret" type="password" />
              </div>

              <Button className="w-full">Save Configuration</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { LockKeyhole, UserCircle2 } from 'lucide-react';
import { LoadingButton } from '@/components/ui/loading-button';
import Link from "next/link";
import { Button } from '@/components/ui/button';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        toast({
          title: 'Signup successful',
          description: 'You can now log in with your credentials.',
        });
        window.location.href = '/login';
      } else {
        toast({
          variant: 'destructive',
          title: 'Signup failed',
          description: 'Please check your details and try again.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Signup error',
        description: 'An error occurred while signing up. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[380px] shadow-lg">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <UserCircle2 size={50} className="text-primary mb-2" />
            </motion.div>
            <CardTitle className="text-2xl">Tweet-X-Agent</CardTitle>
            <CardDescription>Create an account to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <LoadingButton type="submit" className="w-full" >
                <LockKeyhole className="mr-2 h-4 w-4" /> Sign Up
              </LoadingButton>
            </form>

            <div className="mt-4 text-sm text-muted-foreground text-center">
              Already have an account? 
              <Link href="/login" className="text-primary hover:underline"> Login</Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

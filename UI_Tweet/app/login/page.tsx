'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { LockKeyhole, UserCircle2, Github, Twitter } from 'lucide-react';
import { LoadingButton } from '@/components/ui/loading-button';
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from '@/components/ui/button';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (status === "authenticated") {
      router.push('/dashboard/free');
    }
  }, [status, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
  
      if (result?.ok) {
        router.push('/dashboard/free');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login failed',
          description: 'Invalid credentials. Please try again.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login error',
        description: 'An error occurred while logging in. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: '/dashboard/free' });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return null; // Prevent flashing the login page if already logged in
  }

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
            <CardDescription>Enter your credentials to login</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Name@email.com"
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
                  placeholder='*********'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <LoadingButton type="submit" className="w-full" >
                <LockKeyhole className="mr-2 h-4 w-4" /> Login
              </LoadingButton>
            </form>

            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted-foreground/20"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleSocialLogin('google')}
              >
                Google
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleSocialLogin('twitter')}
              >
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleSocialLogin('github')}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>

            <div className="mt-4 text-sm text-muted-foreground text-center">
              <Link href={"/signup"}>
                <LoadingButton type="button" className="w-full" >
                  <LockKeyhole className="mr-2 h-4 w-4" /> Sign Up
                </LoadingButton>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

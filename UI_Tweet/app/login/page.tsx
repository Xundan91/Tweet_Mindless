'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { LockKeyhole, UserCircle2  } from 'lucide-react';
import { LoadingButton } from '@/components/ui/loading-button';
import Link from "next/link";


export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userResponse = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        // Store the user token
        localStorage.setItem('token', userData.token);
        window.location.href = '/dashboard';
      } else {
        toast({
          variant: 'destructive',
          title: 'Login failed',
          description: 'Invalid credentials. Please try again.',
        });
        setIsLoading(false);
      }


      // User login API call
     
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login error',
        description: 'An error occurred while logging in. Please try again.',
      });
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading</div>;
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
              <LoadingButton type="submit" className="w-full" loading={isLoading}>
                <LockKeyhole  className="mr-2 h-4 w-4" /> Login
              </LoadingButton>

            </form>

            <div className="mt-4 text-sm text-muted-foreground text-center">
                <Link href={"/signup"}> 
            <LoadingButton type="submit" className="w-full" loading={isLoading}>
                <LockKeyhole  className="mr-2 h-4 w-4" /> SignUp
              </LoadingButton>
                </Link>
              <div className="mt-1">
                <br />
              </div>
              <button >GooGle</button>
         </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

'use client';
import {Badge} from '@/components/ui/badge'
import { Clock, Crown } from 'lucide-react';
import { DashboardNav } from '@/components/dashboard-nav';
import { Toaster } from '@/components/ui/toaster';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {Button} from '@/components/ui/button'
export default function Pro() {
  const { data: session, status } = useSession();
  const router = useRouter();

    useEffect(() => {
      if (status === 'authenticated') {
        const userType = session?.user?.userType;
        console.log(userType)
        if (userType !== 'free' && userType !== 'premium') {
          console.log("i am here");
          
          router.push(`/dashboard/${userType}`);
        }
        if(userType ==='premium'){
          router.push(`/dashboard/${userType}`)
        }
        if(userType === 'free' ){
          router.push(`/dashboard/${userType}`)
        }
      } 
      else if (status === 'unauthenticated') {
        router.push('/login');
      }
    }, [status, session, router]);

  if (status === 'loading' || (status === 'authenticated' && session?.user?.userType !== 'pro' && session?.user?.userType !== 'premium')) {
    return  <div className="flex h-screen w-full items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>;
  }

  return (
    <div className='min-h-screen bg-background'><DashboardNav />
    <main className='container mx-auto px-4 py-8'>
      <Toaster/>
      <div className='max-w-4xl mx-auto'>
        <div className=' flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold mb-2'>
              Tweet Generator
            </h1>
            <div className='flex items-center'>
              <p className='text-muted-foreground'>
                Create Engaging tweet with AI assistance
              </p>
              <Badge variant = 'outline' className = 'ml-2 bg-primary/10 text-primary'>
              <Crown className="mr-1 h-3 w-3" /> Pro plan
              </Badge>
            </div>
          </div>
          <div className='flex items-center gap-2 sm:gap-4'>
            <Button variant ="outline" size = "sm" onClick={()=>router.push("/dashboard/pro/history")}>
              <Clock className = 'mr-2 h-4 w-4' />
              <span > History
              </span>



            </Button>
          </div>
        </div>
      </div>
    </main>
    </div>

  );
}
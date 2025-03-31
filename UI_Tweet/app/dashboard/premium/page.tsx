'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

export default function Premium() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      const userType = session?.user?.userType;
      console.log(userType);
      
      if (userType !== 'premium' && userType !== 'free') {
        router.push(`/dashboard/${userType}`);
      }
      if(userType ==='free') {
        router.push(`/dashboard/${userType}`)
      }   
    } 
    else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session, router]);

  if (status === 'loading' || (status === 'authenticated' && session?.user?.userType !== 'premium')) {
    return  <div className="flex h-screen w-full items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
  }

  return (
    <div>You are using premium version</div>
  );
}
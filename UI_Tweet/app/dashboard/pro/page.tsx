'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Pro() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the user is authenticated but doesn't have pro or premium access, redirect to free
    if (status === 'authenticated') {
      const userType = session?.user?.userType;
      if (userType !== 'pro' && userType !== 'premium') {
        router.push('/dashboard/free');
      }
    } 
    // If the user isn't logged in, redirect to login
    else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session, router]);

  // Show loading state while checking
  if (status === 'loading' || (status === 'authenticated' && 
      session?.user?.userType !== 'pro' && session?.user?.userType !== 'premium')) {
    return <div>Loading...</div>;
  }

  return (
    <div>You are using pro version</div>
  );
}
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Premium() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the user is authenticated but doesn't have premium access, redirect to their appropriate level
    if (status === 'authenticated') {
      const userType = session?.user?.userType;
      if (userType !== 'premium') {
        router.push(`/dashboard/${userType}`);
      }
    } 
    // If the user isn't logged in, redirect to login
    else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session, router]);

  // Show loading state while checking or redirecting
  if (status === 'loading' || (status === 'authenticated' && session?.user?.userType !== 'premium')) {
    return <div>Loading...</div>;
  }

  return (
    <div>You are using premium version</div>
  );
}
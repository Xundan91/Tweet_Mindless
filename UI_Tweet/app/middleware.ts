import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const pathname = request.nextUrl.pathname;

  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token) {
    const userType = token.userType as string;
    
    if (pathname.startsWith('/dashboard/premium') && userType !== 'premium') {
      return NextResponse.redirect(new URL('/dashboard/' + userType, request.url));
    }
    
    if (pathname.startsWith('/dashboard/pro') && userType !== 'pro' && userType !== 'premium') {
      return NextResponse.redirect(new URL('/dashboard/' + userType, request.url));
    }
    
    if (pathname === '/dashboard' || pathname === '/dashboard/') {
      return NextResponse.redirect(new URL('/dashboard/' + userType, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/dashboard'],
};
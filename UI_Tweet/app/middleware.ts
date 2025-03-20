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

    const restrictedPaths: Record<string, string[]> = {
      free: ['/dashboard/pro', '/dashboard/premium'],
      pro: ['/dashboard/free', '/dashboard/premium'],
      premium: ['/dashboard/pro', '/dashboard/free'],
    };
   

    if (restrictedPaths[userType]?.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL(`/dashboard/${userType}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/dashboard'],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isServer = typeof window === 'undefined'; // Check if code is running on the server

  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/pages/signin' || path === '/pages/signup';

  const jwt = isServer
    ? null
    : localStorage.getItem('faceverse-jwt')?.valueOf || '';

  if (isPublicPath && jwt) {
    return NextResponse.redirect(new URL('/components/home', request.nextUrl));
  }

  // if (!jwt) {
  //   return NextResponse.redirect(new URL('/pages/signin', request.nextUrl));
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/components/home', '/pages/signin', '/pages/signout'], // Add other protected routes here
};

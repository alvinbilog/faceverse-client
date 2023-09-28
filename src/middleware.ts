import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Your getTokenFromLocalStorage function

export function middleware(request: NextRequest) {
  const isServer = typeof window === 'undefined'; // Check if code is running on the server

  // Check if the request path is one of the public paths that do not require authentication
  const isPublicPath = ['/pages/signin', '/pages/signup'].includes(
    request.nextUrl.pathname
  );

  // Get the JWT token from localStorage (only on the client-side)
  const token = isServer ? null : localStorage.getItem('faceverse');
  // If the path is public and a token exists, redirect to the home page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // If the path is not public and no token exists, redirect to the sign-in page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/pages/signin', request.nextUrl));
  }

  // If the path is public or a token exists, allow the request to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/signin', '/signup', '/home'], // Add other protected routes here
};

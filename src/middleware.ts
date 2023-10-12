import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('faceverse-jwt');

  if (!token) {
    return NextResponse.redirect(new URL('/pages/signin', request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/pages/home'],
};

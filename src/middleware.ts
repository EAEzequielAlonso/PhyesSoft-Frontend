// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  console.log("este es el token en el middlewar: ", token)

  const isAuth = !!token;

  const isDashboardPath = request.nextUrl.pathname.startsWith('/dashboard');

  if (!isAuth && isDashboardPath) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}


export const config = {
    matcher: [
      '/dashboard/:path*',
    ],
  };
  
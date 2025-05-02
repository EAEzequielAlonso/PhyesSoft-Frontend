// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const isAuth = !!token;
  const { pathname } = request.nextUrl;

  const isDashboardPath = pathname.startsWith('/dashboard');
  const isAuthPage = pathname === '/login' || pathname === '/register';

  // ❌ Usuario no autenticado intenta entrar al dashboard
  if (!isAuth && isDashboardPath) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ Usuario autenticado intenta entrar a login o register → redirigir al dashboard
  if (isAuth && isAuthPage) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Todo lo demás pasa normal
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
  ],
};

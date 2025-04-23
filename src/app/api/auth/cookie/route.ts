import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ error: 'Token requerido' }, { status: 400 });
  }

  const isProd = process.env.NODE_ENV === 'production';

  (await cookies()).set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 día
  });

  return NextResponse.json({ ok: true });
}

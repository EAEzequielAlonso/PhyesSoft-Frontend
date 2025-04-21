// app/api/auth/signout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout exitoso' });

  response.cookies.set({
    name: 'token', // el nombre de la cookie que vos seteaste en Next.js
    value: '',
    httpOnly: true,
    expires: new Date(0), // la vencemos
    path: '/',
  });

  return response;
}

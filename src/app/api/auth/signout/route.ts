// app/api/auth/signout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = new NextResponse(JSON.stringify({ message: 'Logout exitoso' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}


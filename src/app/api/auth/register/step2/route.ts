import { NextRequest, NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function POST(req: NextRequest) {
  const { email, code } = await req.json();

  if (!email || !code) {
    return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
  }

  const key = `register:${email}`;
  const data = await redis.get(key);

  if (!data) {
    return NextResponse.json({ error: 'No se encontró el registro o expiró' }, { status: 404 });
  }

  const { commerce, password, code: savedCode } = JSON.parse(data);

  if (code !== savedCode) {
    return NextResponse.json({ error: 'Código incorrecto' }, { status: 401 });
  }

  // Crear usuario en tu backend
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, commerce, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: errorData.message || 'Error al crear usuario' }, { status: 500 });
    }

    await redis.del(key); // limpieza
    return NextResponse.json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    console.error('Error al registrar:', err);
    return NextResponse.json({ error: 'Error al registrar usuario' }, { status: 500 });
  }
}

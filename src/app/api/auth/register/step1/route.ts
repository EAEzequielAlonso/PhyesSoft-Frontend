// app/api/register/step1/route.ts
import { NextRequest, NextResponse } from 'next/server';
import redis from '@/lib/redis';
import { sendVerificationEmail } from '@/emails/verificationRegisterEmail';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, commerce, password } = body;

  if (!email || !commerce) {
    return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 });
  }

  // Validar formato de email simple
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
  }
 
  // Consultar al backend de NestJS si el email ya está registrado
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/check-email?email=${email}`);
    const { exists } = await res.json();

    if (exists) {
      return NextResponse.json({ error: 'El email ya está registrado' }, { status: 409 });
    }
  } catch (err) {
    console.error('Error consultando backend:', err);
    return NextResponse.json({ error: 'Error al consultar el servidor' }, { status: 500 });
  }

  // Generar un código de verificación (ej: 6 dígitos)
  const code = Math.floor(100000 + Math.random() * 900000).toString();

// Guardar todos los datos en Redis
const key = `register:${email}`;
const value = JSON.stringify({
  email,
  commerce,
  password, // 🚨 si podés, hashealo antes
  code,
});

await redis.setex(key, 600, value); // 10 minutos

await sendVerificationEmail(email, code);
console.log(`Código de verificación para ${email}: ${code}`);

  return NextResponse.json({ message: 'Código de verificación enviado al correo' });
}

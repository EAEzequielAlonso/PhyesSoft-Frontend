import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import redis from '@/lib/redis';
import { forgotPasswordEmail } from "@/emails/forgotPasswordEmail";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email es requerido." }, { status: 400 });
    } 

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/check-email?email=${email}`);
    const { exists } = await res.json();

    if (!exists) {
      NextResponse.json({ message: "Proceso Terminado." }); //si el email no existe no enviamos nada pero tampoco damos informacion
    }

    const token = uuidv4();

    // Guardamos en Redis: clave = token, valor = email, expiración 15 minutos
    await redis.setex(`reset-password-token:${token}`, 60 * 15, email);

    // Construimos el link de recuperación
    const resetLink = `${process.env.BASE_URL}/reset-password?token=${token}`;

    await forgotPasswordEmail( email, resetLink );

    return NextResponse.json({ message: "Correo enviado." });
  } catch (error) {
    console.error("Error en forgot-password:", error);
    return NextResponse.json({ message: "Error interno." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import redis from "@/lib/redis"; // Asumo que ya tenés tu cliente de Redis configurado

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Datos incompletos." }, { status: 400 });
    }

    // 1. Buscar el email en Redis usando el token
    const email = await redis.get(`reset-password-token:${token}`);

    if (!email) {
      return NextResponse.json({ error: "Token inválido o expirado." }, { status: 400 });
    }

    // 3. Llamar a tu backend para actualizar la contraseña
    const backendRes = await fetch(`${process.env.API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!backendRes.ok) {
      return NextResponse.json({ error: "Error actualizando la contraseña." }, { status: 500 });
    }

    // 4. Eliminar el token de Redis
    await redis.del(`reset-password-token:${token}`);

    // 5. Responder OK
    return NextResponse.json({ message: "Contraseña restablecida correctamente." }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error inesperado." }, { status: 500 });
  }
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

export default function LoginFormClient() {
  const router = useRouter();
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const dataJson = await res.json();

      if (!res.ok) {
        setError(dataJson.message || 'Error al iniciar sesión');
        return;
      }

      const { token } = dataJson;

      // Llamada a API interna para setear cookie HttpOnly
      const cookieRes = await fetch('/api/auth/cookie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!cookieRes.ok) {
        setError('No se pudo guardar la sesión');
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error inesperado');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold font-montserrat text-center text-[#0D47A1]">
          Iniciar Sesión
        </h1>
        {error && (
          <p className="text-center text-sm text-red-600">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="tucorreo@ejemplo.com"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1976D2]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1976D2]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#FF9800] hover:bg-[#e68900] transition-colors cursor-pointer duration-200 rounded-md font-semibold text-white shadow-md"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="flex justify-between text-sm">
          <Link href="/forgot-password" className="text-[#1976D2] hover:underline">
            Olvidé mi contraseña
          </Link>
          <Link href="/register" className="text-[#1976D2] hover:underline">
            Crear nueva cuenta
          </Link>
        </div>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">o continúa con</span>
          </div>
        </div>

        <div>
          <button className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <FcGoogle className="w-5 h-5" />
            <span className="font-medium text-gray-700">Iniciar sesión con Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

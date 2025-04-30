'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const [formData, setFormData] = useState({
    commerce: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
  
    try {
      const res = await fetch('/api/auth/register/step1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          commerce: formData.commerce,
          password: formData.password,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || 'Error al registrar el usuario');
      }
  
      // Redirigimos al paso de verificación
      router.push(`/verification-code?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error inesperado');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold font-montserrat text-center text-[#0D47A1]">
          Crear Cuenta
        </h1>

        {error && (
          <p className="text-center text-sm text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="commerce" className="block text-sm font-medium text-gray-700">
              Nombre del Comercio
            </label>
            <input
              type="text"
              name="commerce"
              id="commerce"
              required
              placeholder="Mi Tienda"
              value={formData.commerce}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#1976D2] placeholder-gray-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#1976D2] placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              required
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#1976D2] placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute cursor-pointer right-3 top-9 text-sm text-gray-500"
            >
              {passwordVisible ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              required
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#1976D2] placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute cursor-pointer right-3 top-9 text-sm text-gray-500"
            >
              {confirmPasswordVisible ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#FF9800] hover:bg-[#e68900] transition-colors cursor-pointer duration-200 rounded-md font-semibold text-white shadow-md"
          >
            Crear Cuenta
          </button>
        </form>

        <div className="flex justify-between text-sm">
          <Link href="/login" className="text-[#1976D2] hover:underline">
            Ya tengo una cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}

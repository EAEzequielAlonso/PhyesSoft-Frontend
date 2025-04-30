'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const VerificarCodigoForm = ({ email }: { email?: string }) => {
  const router = useRouter();

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60); // 60 segundos por defecto
  const [canRetry, setCanRetry] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonta
    } else {
      setCanRetry(true); // Habilitar el botón de reintentar cuando el tiempo se agota
    }
  }, [timer]);

  if (!email ) {
    return <p className="text-red-600">Falta el email. Volvé al registro.</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register/step2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error de verificación');
      }

      // Registro completado, redirigimos al login
      router.push('/login');
    } catch (err) {
      console.error(err);
      setError('Error del servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    // Aquí puedes agregar la lógica para volver a enviar el código al email
    setError('');
    setTimer(60); // Reiniciamos el contador
    setCanRetry(false); // Deshabilitamos el botón mientras esperamos
    // Lógica para volver a enviar el código (API call o lo que necesites)
    console.log('Reenviando código...');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-[#0D47A1]">
          Verificar Código
        </h1>
        <p className="text-sm text-center text-gray-600">
          Ingresá el código enviado a <span className="font-semibold">{email}</span>
        </p>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Código de Verificación
            </label>
            <input
              type="text"
              id="code"
              name="code"
              required
              maxLength={6}
              pattern="\d{6}"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#1976D2] placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#4CAF50] hover:bg-[#43a047] transition-colors cursor-pointer duration-200 rounded-md font-semibold text-white shadow-md"
          >
            {loading ? 'Verificando...' : 'Verificar'}
          </button>

          {timer > 0 ? (
            <p className="text-center text-sm text-gray-600">
              Podés reintentar en {timer} segundos...
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendCode}
              disabled={!canRetry}
              className="w-full py-2 px-4 bg-[#FF9800] hover:bg-[#fb8c00] transition-colors cursor-pointer duration-200 rounded-md font-semibold text-white shadow-md mt-4"
            >
              {canRetry ? 'Reenviar Código' : 'Esperando...'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

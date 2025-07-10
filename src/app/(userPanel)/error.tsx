// app/dashboard/products/error.tsx
"use client"; // Tiene que ser un Client Component obligatoriamente

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()
  useEffect(() => {
    console.error("Error al cargar registros:", error);
    
    if (error.message.includes("401")) {
        const redirection = async () => {
            try {
              // Luego deslogueo en NextJS
              const resNext = await fetch('/api/auth/signout', {
                method: 'POST',
                credentials: 'include',
              });

              if (resNext.ok) {
                router.push('/login');
              } else {
                console.error('Error cerrando sesión');
              }
            } catch (err) {
              console.error('Error en logout', err);
            }
        }
      redirection();
    }

  }, [error, reset]);

  return (
    <div className="text-center py-10">
      <h2 className="text-red-500 text-lg font-semibold">¡Algo salió mal!</h2>
      <p className="mb-4">{error.message}</p>

      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Reintentar
      </button>
    </div>
  );
}
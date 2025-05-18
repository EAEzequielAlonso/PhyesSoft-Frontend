// app/dashboard/products/error.tsx
"use client"; // Tiene que ser un Client Component obligatoriamente

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Error al cargar registros:", error);
  }, [error]);

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
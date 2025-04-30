"use client";

import { useState } from "react";
import { useToast } from "@/context/ToastContext";

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
  
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        showToast(`Si tu ${email} esta registrado recibiras un email con instrucciones`, "success");
      } else {
        showToast(`Ocurrio un error al enviar el email a ${email}`, "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast(`Ocurrió un error inesperado.`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-[#F5F5F5] px-4">
      <div className="max-w-md w-full h-full mt-5 bg-white shadow-xl rounded-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-[#0D47A1]">
          Recupera tu cuenta
        </h1>
        <p className="text-sm text-center text-gray-600 mb-6 font-semibold">
          Sigue estos pasos para restablecer tu contraseña de forma rápida y segura.
        </p>

        {/* Pasos de recuperación */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-[#1976D2] text-white flex items-center justify-center rounded-full font-bold">
              1
            </div>
            <p className="text-gray-700 text-sm">
              Escribe tu correo electrónico y envía la solicitud de recuperación.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-[#1976D2] text-white flex items-center justify-center rounded-full font-bold">
              2
            </div>
            <p className="text-gray-700 text-sm">
              Revisa tu bandeja de entrada y haz clic en el enlace que te enviamos.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-[#1976D2] text-white flex items-center justify-center rounded-full font-bold">
              3
            </div>
            <p className="text-gray-700 text-sm">
              Ingresa tu nueva contraseña y confírmala para actualizarla.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-[#1976D2] text-white flex items-center justify-center rounded-full font-bold">
              4
            </div>
            <p className="text-gray-700 text-sm">
              Inicia sesión con tu nueva contraseña y vuelve a acceder a tu cuenta.
            </p>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5 pt-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@example.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#1976D2] placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#4CAF50] hover:bg-[#43a047] transition-colors cursor-pointer duration-200 rounded-md font-semibold text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando..." : "Enviar instrucciones"}
          </button>

          {message && (
            <p className="text-center text-sm text-gray-700 mt-4">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

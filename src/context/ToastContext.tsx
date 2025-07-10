"use client";

import { createContext, useContext } from "react";
import { Toaster, toast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning";

const ToastContext = createContext<{ showToast: (message: string, type?: ToastType) => void }>({
  showToast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const showToast = (message: string, type: ToastType = "info") => {
        switch (type) {
          case "success":
            toast.success(message, { 
              style: { 
                background: "rgba(76, 175, 80, 0.7)",  // Verde con 30% de opacidad
                color: "#fff",
                backdropFilter: "blur(10px)" // Opcional, da un efecto de desenfoque ligero
              } 
            });
            break;
          case "error":
            toast.error(message, { style: { 
              background: "rgba(244, 67, 54, 0.7)",  // Rojo con 70% de opacidad
              color: "#fff",
              backdropFilter: "blur(10px)"
            } }); // Rojo
            break;
          case "warning":
            toast.warning(message, { style: { 
              background: "rgba(255, 193, 7, 0.7)",  // Amarillo con 70% de opacidad
              color: "#000",  // Texto negro para mejor contraste
              backdropFilter: "blur(10px)"
            } }); // Naranja
            break;
          default:
            toast.info(message, { style: { 
              background: "rgba(33, 150, 243, 0.7)",  // Azul con 70% de opacidad
              color: "#fff",
              backdropFilter: "blur(10px)"
            } }); // Azul
        }
      };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toaster position="bottom-right" />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

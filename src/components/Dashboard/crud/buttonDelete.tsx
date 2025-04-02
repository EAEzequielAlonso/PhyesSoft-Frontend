"use client"

import { LuTrash } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";

interface Props {
    id: string;
    endpoint: string;
    label: string
}

export function ButtonDelete ({id, endpoint, label}: Props) {
    const router = useRouter()
    const { showToast } = useToast();
    const handleOnClick = async () => {
      try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            });
            if (!result.ok) {
                throw new Error();
              }
            showToast(`${label} eliminada con éxito`, "success");
            router.refresh(); // Actualiza la lista después de eliminar
        
        } catch {
          showToast(`Error al eliminar ${label}`, "error");
        }
    } 
    return (
       <button className="btn-text-red mx-2 my-1" onClick={handleOnClick}><LuTrash /></button>
    )
}
"use client"

import { LuTrash } from "react-icons/lu";
import { useRouter } from "next/navigation";

interface Props {
    brandId: string;
    endpoint: string
}

export default function ButtonDelete ({brandId, endpoint}: Props) {
    const router = useRouter()
    const handleOnClick = async () => {
      try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${brandId}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            });
            if (!result.ok) {
                throw new Error("Error al eliminar el registro");
              }
        
            router.refresh(); // Actualiza la lista después de eliminar
        
        } catch {
            console.error("No se pudo eliminar el registro");
        }
    } 
    return (
       <button className="btn-text-red mx-2 my-1" onClick={handleOnClick}><LuTrash /></button>
    )
}
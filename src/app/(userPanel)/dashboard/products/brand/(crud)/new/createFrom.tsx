"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";


interface Props {
    endpoint: string;
    label: string;
    varios?: boolean;
}

export default function CreateForm ({endpoint, label, varios = false}: Props) {
    const route = useRouter()
    console.log("varios: ", varios)
    const handleAction = async (formData: FormData) => {
        
        try {
              const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ name: formData.get("name") }),
              });
              if (!response.ok) route.push("/dashboard/products/brand/new?messageError='Error al intentar guardar'")
              if (!varios) route.push("/dashboard/products/brand") 
        } catch (error) {
          console.error("Error al intentar crear una Marca:", error);
        }
      };
        
        return (
            <form action={handleAction}>
              <div className="mb-4">
                <label className="block mb-1">Nombre</label>
                <input
                  name="name"
                  defaultValue= ""
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="flex space-x-2 justify-end">
                <button
                  type="submit"
                  className="btn-text-green"
                >
                  Crear
                </button>
                <Link href="/dashboard/products/brand">
                <button
                  className="btn-text-red"
                >
                  Volver
                </button>
                </Link>
              </div>
            </form>
        )
} 
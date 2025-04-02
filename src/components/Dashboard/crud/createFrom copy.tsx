"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { FormCrud } from "@/types";


interface Props<T> {
    endpoint: string;
    label: string;
    varios?: boolean;
    item?: T;
    formCrud: FormCrud<T>[];
}

export function CreateForm<T extends {id:string}> ({endpoint, label, varios = false, item}: Props<T>) {
    const route = useRouter()
    const { showToast } = useToast();
    const handleAction = async (formData: FormData) => {
        try {
              const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}${item ? `/${item.id}` : ""}`, {
                method: item ? "PUT" : "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                //body: JSON.stringify({ name: formData.get("name") }), ACA NECESITO MANDAR TODOS LOS DATOS DEL FORMULARIO SEGUN SU KEY CORRESPONDIENTE
              });
              if (!response.ok) throw new Error();
              showToast(`${label} ${item ? "actualizada" : "creada"} con éxito`, "success");
              if (!varios) route.push(`/dashboard/products/${endpoint}`) 
              
        } catch (error) {
          showToast(`Error al ${item ? "actualizar" : "crear"} ${label}`, "error");
        }
      };


        
        return (
            <form action={handleAction}>
              <div className="mb-4"> 
                <label className="block mb-1">Nombre</label>
                <input
                  name="name"
                  defaultValue="" //en estos inputs deberia ir un map con los datos de entrada. si id existe se le asigna el dato por defecto.
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
                  {item ? "Actualizar" : "Crear"}
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
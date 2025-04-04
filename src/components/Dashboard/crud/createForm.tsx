"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { FormCrud } from "@/types";

interface Props<T extends { id?: string }> {
  endpoint: string;
  label: string;
  varios?: boolean;
  item?: T;
  formCrud: FormCrud<T>[];
}

export function CreateForm<T extends { id?: string }>({
  endpoint,
  label,
  varios = false,
  item,
  formCrud,
}: Props<T>) {
  const route = useRouter();
  const { showToast } = useToast();

  const handleAction = async (formData: FormData) => {
    try {
      const formObject: Partial<T> = {};
      formCrud.forEach((field) => {
        formObject[field.key] = formData.get(field.key as string) as any;
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}${item ? `/${item.id}` : ""}`,
        {
          method: item ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formObject),
        }
      );

      if (!response.ok) throw new Error();
      showToast(`${label} ${item ? "actualizada" : "creada"} con éxito`, "success");
      if (!varios) route.push(`/dashboard/products/${endpoint}`);
    } catch (error) {
      showToast(`Error al ${item ? "actualizar" : "crear"} ${label}`, "error");
    }
  };

  return (
    <form action={handleAction}>
      {formCrud.map((field) => (
        <div key={field.key as string} className="mb-4">
          <label className="block mb-1">{field.label}</label>
          {field.elementForm === "select" ? (
            <select
              name={field.key as string}
              defaultValue={String(item?.[field.key] ?? "")}
              required
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Seleccione una opción</option>
              {field.data?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              name={field.key as string}
              defaultValue={String(item?.[field.key] ?? "")}
              type={field.elementForm}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          )}
        </div>
      ))}
      <div className="flex space-x-2 justify-end">
        <button type="submit" className="btn-text-green">
          {item ? "Actualizar" : "Crear"}
        </button>
        <Link href={`/dashboard/products/${endpoint}`}>
          <button type="button" className="btn-text-red">
            Volver
          </button>
        </Link>
      </div>
    </form>
  );
}

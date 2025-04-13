"use client"

import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { FormCrud, SelectOption } from "@/types";
import { useState } from "react";

interface Props<T extends { id?: string }> {
  endpoint: string;
  section: string;
  label: string;
  varios?: boolean;
  item?: T;
  formCrud: FormCrud<T>[];
}

export function CreateForm<T extends { id?: string }>({
  endpoint,
  section,
  label,
  varios = false,
  item,
  formCrud,
}: Props<T>) {
  const route = useRouter();
  const { showToast } = useToast();
  
  const [dynamicOptions, setDynamicOptions] = useState<Record<string, SelectOption[]>>({});

  const handleAction = async (formData: FormData) => {
    try {
      const formObject: Partial<T> = {};
      formCrud.forEach((field) => {
        const value = formData.get(field.key as string);
        if (value !== null) formObject[field.key] = value.toString() as T[keyof T];
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
      if (!response.ok) {
        throw new Error();
      }
      showToast(`${label} ${item ? "actualizada" : "creada"} con éxito`, "success");
      if (!varios) route.push(`/dashboard/${section}/${endpoint}`);
    } catch {
      
      showToast(`Error al ${item ? "actualizar" : "crear"} ${label}`, "error");
    }
  };

  const handleOnChange = async (field: FormCrud<T>, value: string) => {
    if (!field.relation) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${field.relation.replace(/Id$/, "")}/${String(field.key).replace(/Id$/, "")}/${value}`, {
        credentials: "include",
      });
      const data = await res.json();
      setDynamicOptions((prev) => ({
        ...prev,
        [field.relation as string]: data,
      }));
    } catch (error) {
      console.error("Error cargando datos relacionados:", error);
    }
  }


  return (
    <form action={handleAction}>
      {formCrud.map((field) => (
        <div key={field.key as string} className="mb-4">
          <label className="block mb-1">{field.label}</label>
          {field.elementForm === "select" ? (
            <select
              name={field.key as string}
              defaultValue={String(item?.[field.key] ?? "")}
              onChange= {(e) => handleOnChange(field, e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Seleccione una opción</option>
              {(dynamicOptions[field.key as string] ?? field.data)?.map((option) => (
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
      </div>
    </form>
  );
}

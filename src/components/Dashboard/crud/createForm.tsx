"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { FormCrud, SelectOption } from "@/types";
import { useEffect, useRef, useState } from "react";

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
  const formRef = useRef<HTMLFormElement>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  const [dynamicOptions, setDynamicOptions] = useState<Record<string, SelectOption[]>>({});

  useEffect(() => {
    // Solo cuando el formulario se monta por primera vez
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData = new FormData(formRef.current!);
  try {
    const formObject: Partial<T> = {};
    formCrud.forEach((field) => {
        const rawValue = formData.get(field.key as string);

        let value: unknown = rawValue;

        if (field.elementForm === "checkbox") {
          value = rawValue === "on";
        } else { 
          if (field.elementForm === "select") {
          const stringValue = rawValue?.toString();

          // ⚠️ Este es el punto clave:
          value = stringValue === "" ? null : stringValue;
          } else {
            if (field.elementForm === "number") {
              const stringValue = rawValue?.toString();

              // ⚠️ Este es el punto clave:
              value = stringValue === "" ? 0 : stringValue;
              }

          }
        }

        formObject[field.key] = value as T[keyof T];
    });
    console.log("este es el objeto que estoy mandando: ", formObject)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}${item ? `/${item.id}` : ""}`,
      {
        method: item ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formObject),
      }
    );

    const resp = await response.json();
    console.log("imprimo la respuesta: ", resp)

    if (!response.ok) {
      throw new Error(JSON.stringify(resp));
    }

    showToast(`${label} ${item ? "actualizada" : "creada"} con éxito`, "success");

    if (!varios) {
      route.push(`/dashboard/${section}/${endpoint}`);
    } else {
      // Limpia solo campos no select
      const formElements = formRef.current?.elements;
      if (formElements) {
        for (const el of Array.from(formElements)) {
          if (el instanceof HTMLInputElement) {
            if (
              el.type === "text" ||
              el.type === "number" ||
              el.type === "email" ||
              el.type === "date"
            ) {
              el.value = "";
            } else if (el.type === "checkbox") {
              el.checked = false;
            }
          }
        }
      }

      // Enfocar primer input
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 0);
    }

  } catch (error) {
    console.error("ERROR: ", error)
    showToast(
      `Error al ${item ? "actualizar" : "crear"} ${label}. Intente nuevamente mas tarde`,
      "error"
    );
  }
};

  const handleOnChange = async (field: FormCrud<T>, value: string) => {
    if (!field.relation) return;
    if (value === "") {
      setDynamicOptions(() => ({
        [field.relation as string]: [],
      }));
      return
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${field.relation.replace(/Id$/, "")}/${String(field.key).replace(/Id$/, "")}/${value}`,
        { credentials: "include" }
      );
      const data = await res.json();
      setDynamicOptions((prev) => ({
        ...prev,
        [field.relation as string]: data,
      }));
    } catch (error) {
      console.error("Error cargando datos relacionados:", error);
    }
  };

  const getNestedValue = (obj: any, path: string): any =>
    path.split('.').reduce((acc, part) => acc?.[part], obj);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="text-sm">
      {formCrud.map((field, index) => (
        <div key={field.key as string} className="mb-6">
          {field.elementForm === "checkbox" ? (
            <label className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                name={field.key as string}
                defaultChecked={item ? Boolean(item?.[field.key]) : Boolean(field.defaultValue)}
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="text-gray-700">{field.label}</span>
            </label>
          ) : (
            <>
              <label className="block mb-1 font-medium text-gray-700">{field.label}</label>
              {field.elementForm === "select" ? (
                <select
                  name={field.key as string}
                  defaultValue={item ? String(item?.[field.key] ?? null) : String(field.defaultValue ? field.defaultValue : null)}
                  onChange={(e) => handleOnChange(field, e.target.value)}
                  className="w-full border border-gray-300 rounded p-1"
                >
                  <option value="">{field.placeholder ?? "Seleccione una opción"}</option>
                  {(dynamicOptions[field.key as string] ?? field.data)?.map((option) => (
                    <option key={option.id} value={option.id}>
                      {field.atributeDisplay
                          ? `${getNestedValue(option, field.atributeDisplay[0])} - 
                             ${getNestedValue(option, field.atributeDisplay[1])}`
                          : option.name}
                    </option>
                  ))}
                </select>
              ) : field.elementForm === "container" ? (
                <div>Hola</div>
              ) : (
                <input
                  ref={index === 0 ? firstInputRef : undefined}
                  type={field.elementForm}
                  name={field.key as string}
                  defaultValue={item ? String(item?.[field.key]) : (field.elementForm === "number" ? 0 : "")}
                  required = {Boolean(field.required)}
                  className="w-full border border-gray-300 rounded p-1"
                />
              )}
            </>
          )}
        </div>
      ))}
      <div className="flex justify-end space-x-2">
        <button type="submit" className="btn-text-green">
          {item ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}

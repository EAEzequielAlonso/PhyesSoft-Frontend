"use client";

import { MovementType } from "@/types";
import { useToast } from "@/context/ToastContext";
import { FormEvent, useRef} from "react";
import { fetchPost } from "@/fetchs/dashboard/crudFetchClient";


interface Props {
  movType: MovementType[];
  dailyCashId: string;
}

export function CashMovForm({ movType, dailyCashId }: Props) {
  const { showToast } = useToast();
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleMovRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(formRef.current!);

    const body = {
      amount: formData.get("amount")?.toString(),
      movementTypeId: formData.get("movType")?.toString(),
      description: formData.get("description")?.toString(),
      dailyCashId,
    };

    try {

      await fetchPost("cash-movement", "Movimiento de Caja", body);
      showToast("El movimiento de caja se registró con éxito", "success");
      formRef.current?.reset(); // ✅ Limpieza segura y simple

    } catch {

      showToast("No pudo registrarse el movimiento de caja", "error");
    }
  };

  return (
    <div className="px-3">
        <h3 className="text-sm font-semibold text-[#0D47A1] mb-2 font-montserrat">
          Registrar Movimiento
        </h3>
      <form ref={formRef} onSubmit={handleMovRegister} className="flex flex-col gap-2">
        <select
          name="movType"
          className="border border-gray-300 px-3 py-2 rounded text-sm"
          required
        >
          <option value="">Elija un tipo de movimiento</option>
          {movType.map((mov) => (
            <option key={mov.id} value={mov.id}>
              {mov.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="description"
          placeholder="Descripción"
          className="border border-gray-300 px-3 py-2 rounded text-sm flex-1"
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Monto"
          className="border border-gray-300 px-3 py-2 rounded text-sm flex-1"
          required
          step="0.01"
        />

        <button
          type="submit"
          className="btn-text-orange"
        >
          Agregar
        </button>
      </form>
    </div>
  );
}

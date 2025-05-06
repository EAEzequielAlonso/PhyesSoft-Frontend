"use client";

import { MovementType } from "@/types";
import { useToast } from "@/context/ToastContext";
import { FormEvent } from "react";
import { fetchPost } from "@/fetchs/dashboard/crudFetchClient";

interface Props {
  movType: MovementType[];
  dailyCashId: string;
}

export function CashMovForm({ movType, dailyCashId }: Props) {
  const { showToast } = useToast();

  const handleMovRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const body = {
        amount: formData.get("amount")?.toString(),
        movementTypeId: formData.get("movType")?.toString(),
        description: formData.get("description")?.toString(),
        dailyCashId,
    }

    const resp = await fetchPost("cash-movement", "Movimiento de Caja", body)

    if (!resp.ok) {
      showToast("No pudo registrarse el Movimiento de Caja", "error");
      return;
    }

    showToast("El movimiento de caja se registró con éxito", "success");
    e.currentTarget.reset();
  };

  return (
    <div className="px-3">
      <h3 className="text-sm font-semibold text-[#0D47A1] mb-2 font-montserrat">
        Registrar Movimiento
      </h3>
      <form onSubmit={handleMovRegister} className="flex flex-col gap-2">
        <select
          name="movType"
          className="border border-gray-300 px-3 py-2 rounded text-sm"
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
        />
        <input
          type="number"
          name="amount"
          placeholder="Monto"
          className="border border-gray-300 px-3 py-2 rounded text-sm flex-1"
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

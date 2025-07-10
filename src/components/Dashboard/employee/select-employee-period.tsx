"use client";

import { Employee } from "@/types";
import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { LuSearch } from "react-icons/lu";


interface Props {
  periodStart: string;
  periodEnd: string;
  employees: Employee[];
  setEmployeeId: React.Dispatch<React.SetStateAction<string>>;
  setPeriodStart: React.Dispatch<React.SetStateAction<string>>;
  setPeriodEnd: React.Dispatch<React.SetStateAction<string>>;
  setSelectedEmp: React.Dispatch<React.SetStateAction<Employee | null>>;
}

export function SelectEmployeePeriod({
  periodStart,
  periodEnd,
  employees,
  setEmployeeId,
  setPeriodStart,
  setPeriodEnd,
  setSelectedEmp,
}: Props) {
  const [localEmployeeId, setLocalEmployeeId] = useState<string>("");
  const [localSelectedEmp, setLocalSelectedEmp] = useState<Employee | null>(null);
  const [localPeriodStart, setLocalPeriodStart] = useState(periodStart);
  const [localPeriodEnd, setLocalPeriodEnd] = useState(periodEnd);

  const { showToast } = useToast();

  const handleClick = () => {
    if (!localEmployeeId || !localPeriodStart || !localPeriodEnd) {
      showToast(`Todos los campos son obligatorios.`, 'error');
      return;
    }

    const startDate = new Date(localPeriodStart);
    const endDate = new Date(localPeriodEnd);

      if (startDate > endDate) {
      showToast(`La fecha 'Desde' debe ser anterior a 'Hasta'.`, 'error');
      return;
    }

    // Clear error and propagate to parent
    setEmployeeId(localEmployeeId);
    setSelectedEmp(localSelectedEmp);
    setPeriodStart(localPeriodStart);
    setPeriodEnd(localPeriodEnd);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col gap-4 md:flex-row md:items-end border border-gray-300">
      <div className="flex-1">
        <label className="block mb-1">Empleado</label>
        <select
          value={localEmployeeId ?? ""}
          onChange={(e) => {
            const selectedId = e.target.value;
            const selectedEmp = employees.find(emp => emp.id === selectedId) || null;

            setLocalEmployeeId(selectedId);
            setLocalSelectedEmp(selectedEmp);
          }}
          className="w-full border rounded p-2 focus:outline-blue-300"
        >
          <option value="">Seleccionar Empleado</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name} — {e.cuit || e.dni}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Desde</label>
        <input
          type="date"
          value={localPeriodStart}
          placeholder="Fecha de inicio"
          onChange={(e) => setLocalPeriodStart(e.target.value)}
          className="border rounded p-2 focus:outline-blue-300"
        />
      </div>

      <div>
        <label className="block mb-1">Hasta</label>
        <input
          type="date"
          value={localPeriodEnd}
          onChange={(e) => setLocalPeriodEnd(e.target.value)}
          className="border rounded p-2 focus:outline-blue-300"
        />
      </div>

      <div> 
        <button
          type="button"
          onClick={handleClick}
          className="btn-icon-orange"
        >
          <LuSearch size={20}/>
        </button>
      </div>
    </div>
  );
}

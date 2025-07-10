"use client"

import { Bonus, PayrollBonus } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { LuCirclePlus, LuDelete } from "react-icons/lu";
import React, { useEffect, useState } from "react";
import { fetchGetClient } from "@/fetchs/dashboard/crudFetchClient";
import { useToast } from "@/context/ToastContext";

interface Extra {
  id: string;
  label: string;
  amount: number;
  quantity: number;
}

interface Props {  
   payrollBonus?: PayrollBonus[] | null;
   setPayrollBonus: React.Dispatch<React.SetStateAction<PayrollBonus[] | null>>;
   readOnly?: boolean;
}

export function AdditionalLiquidation({
  setPayrollBonus, // Callback to update the payroll bonus state
  readOnly = false,
  payrollBonus,
}: Props) {

    const [bonuses, setBonuses] = useState<Bonus[]>([]);
    const [bonusId, setBonusId] = useState("");
    const [bonusName, setBonusName] = useState("");
    const [bonusAmount, setBonusAmount] = useState<number>(0);
    const [bonusCount, setBonusCount] = useState<number>(1);
    const [bonusEmployee, setBonusEmployee] = useState<Extra[]>([]);
    
    const { showToast } = useToast();
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const allbonuses = await fetchGetClient('bonus/commerce', '', 'Adicionales');
            if (!allbonuses || allbonuses.length === 0) {
              showToast("No hay adicionales disponibles. Debe Agregarlos Primero", "info");
              return;
            }
            setBonuses(allbonuses);

          } catch (error) {
            console.error("Error al cargar adicionales:", error);
            showToast(`Error al cargar los adicionales: ${error}`, 'error');
          }}
        fetchData();
    }, []);

    useEffect(() => {
      if (!readOnly) {
        const newBonuses: PayrollBonus[] = bonusEmployee.map((bonus) => ({
          bonusId: bonus.id,
          amount: bonus.amount,
          quantity: bonus.quantity,
        }));
        setPayrollBonus(newBonuses);
      }
    }, [bonusEmployee]);

    useEffect(() => {
      if (readOnly && payrollBonus) {
        const newBonuses: Extra[] = payrollBonus.map((bonus) => {
          const matchedBonus = bonuses.find((b) => b.id === bonus.bonusId);
          return {
              id: bonus.bonusId,
              label: matchedBonus ? matchedBonus.name : "Desconocido",
              amount: bonus.amount,
              quantity: bonus.quantity,
          }
        });
        setBonusEmployee(newBonuses);
      }
    }, [payrollBonus]);

  // Handlers
function addBonus() {
  if (!bonusId || bonusAmount <= 0 || bonusCount <= 0) return;

  // Verifica si ya existe un bonus con el mismo ID en la lista
  const alreadyExists = bonusEmployee.some(b => b.id === bonusId);
  if (alreadyExists) {
    showToast("Este adicional ya fue agregado.", "warning");
    return;
  }

  setBonusEmployee((prev) => [
    ...prev,
    { id: bonusId, label: bonusName, amount: bonusAmount, quantity: bonusCount },
  ]);

  setBonusId("");
  setBonusName("");
  setBonusAmount(0);
  setBonusCount(1);
}


  return (
    <div className="bg-white p-2 rounded-xl shadow space-y-4 border border-gray-300">
      <h3 className="text-base font-medium">Adicionales / Premios</h3>
        {!readOnly && (  
          <div className="flex gap-2 ">
            <select
              value={bonusId}
              onChange={(e) => {
                  const selectedId = e.target.value;
                  setBonusId(selectedId);

                  const selectedBonus = bonuses.find(b => b.id === selectedId);
                  if (selectedBonus) {
                    setBonusAmount(Number(selectedBonus.value));
                    setBonusName(selectedBonus.name);
                  }
                }}
              className="w-full border rounded p-1 focus:outline-blue-300"
            >
              <option value="">Seleccionar</option>
              {bonuses.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name} - {formatCurrency('$', Number(e.value) || 0)}
                    </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Monto"
                value={bonusAmount || ""}
                onChange={(e) => setBonusAmount(Number(e.target.value))}
                className="border rounded p-1 focus:outline-blue-300 max-w-32"
              />
              <input
                type="number"
                placeholder="Cantidad"
                value={bonusCount || ""}
                onChange={(e) => setBonusCount(Number(e.target.value))}
                className="border rounded p-1 focus:outline-blue-300 max-w-14"
              />
              <button
                  type="button"
                  onClick={addBonus}
                  className="btn-text-green"
                >
                  <LuCirclePlus size={18} />
              </button>
            </div>
           )}
        <table className="w-full text-left text-xs">
          <thead className="border-b">
            <tr>
                      <th className="py-1">Detalle</th>
                      <th className="py-1">Monto</th>
                      <th className="py-1">Cant.</th>
                      <th className="py-1">Total</th>
                      { !readOnly && (   
                        <th className="py-1">Eliminar</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {bonusEmployee.map((x) => (
                      <tr key={x.id} className="hover:bg-gray-50">
                        <td className="py-1">{x.label}</td>
                        <td className="py-1">{formatCurrency("$", x.amount)}</td>
                        <td className="py-1">{x.quantity}</td>
                        <td className="py-1">
                          {formatCurrency("$", x.amount * x.quantity)}
                        </td>
                        { !readOnly && ( 
                        <td className="py-1">
                          <button
                              type="button"
                              onClick={() => {
                                setBonusEmployee((prev) =>
                                  prev.filter((b) => b.id !== x.id)
                                );
                              }}
                              className="btn-text-red"
                            >
                              <LuDelete size={18} />
                            </button>
                        </td>
                        )}
                      </tr>
                    ))}
                    {bonusEmployee.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-2 text-gray-400 text-center">
                          Sin adicionales
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
  );
}
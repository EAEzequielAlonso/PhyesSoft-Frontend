"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Branch } from "@/types";
import { useToast } from "@/context/ToastContext";

interface Props {
  branches: Branch[];
}

export function OpenFilterBox({ branches }: Props) {
  const router = useRouter();
  const { showToast } = useToast();
  const singleBranch = branches.length === 1 ? branches[0] : null;
  const [selectedBranchId, setSelectedBranchId] = useState(singleBranch?.id || "");
  const selectedBranch = branches.find((b) => b.id === selectedBranchId);

  const boxOptions = selectedBranch?.boxesCash ? selectedBranch.boxesCash : [];
  const singleBox = boxOptions.length === 1 ? boxOptions[0] : null;

  const [selectedBoxId, setSelectedBoxId] = useState(singleBox?.id || "");
  const [initCash, setInitCash] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleOpenBox = async () => {

    if (!selectedBranchId || !selectedBoxId || initCash < 0) { 
        showToast(`Los datos ingresados no son correctos`, "error");
        return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/daily-cash`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          boxCashId: selectedBoxId,
          initCash,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }
      
      showToast("Caja abierta con éxito", "success");
      router.refresh();
      setSelectedBranchId("");
      setSelectedBoxId("");
      setInitCash(0);
    } catch (err) {
        console.error(err)
        showToast("La caja ya se encuentra abierta. Solo puede haber una caja abierta al mismo tiempo", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBranchChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBranchId(e.target.value);
    setSelectedBoxId("");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-300 flex flex-col md:flex-row gap-4 items-end">
      {/* Sucursal */}
      <div className="flex-1">
        {singleBranch ? (
          <div className="text-sm text-gray-700">Sucursal: <strong>{singleBranch.name}</strong></div>
        ) : (
          <select
            value={selectedBranchId}
            onChange={handleBranchChange}
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
          >
            <option value="" disabled>Seleccionar Sucursal</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        )}
      </div>

      {/* Caja */}
      <div className="flex-1">
        {singleBox ? (
          <div className="text-sm text-gray-700">Caja: <strong>{singleBox.name}</strong></div>
        ) : (
          <select
            value={selectedBoxId}
            onChange={(e) => setSelectedBoxId(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
            disabled={!selectedBranch}
          >
            <option value="" disabled>Seleccionar Caja</option>
            {boxOptions.map((box) => (
              <option key={box.id} value={box.id}>{box.name}</option>
            ))}
          </select>
        )}
      </div>

      {/* Monto Inicial */}
      <div className="flex-1">
        <input
          type="number"
          placeholder="Monto inicial"
          value={initCash === 0 ? "" : initCash}
          onChange={(e) => setInitCash(Number(e.target.value))}
          className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
        />
      </div>

      {/* Botón */}
      <button
        onClick={handleOpenBox}
        disabled={loading || !selectedBranchId || !selectedBoxId}
        className="btn-text-orange"
      >
        {loading ? "Abriendo..." : "Abrir Caja"}
      </button>
    </div>
  );
}

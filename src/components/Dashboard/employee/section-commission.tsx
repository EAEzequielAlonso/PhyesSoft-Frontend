import { Sale } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import React from "react";


interface Props {  
    commissions: Sale[] | null;
    porcent: number;
    setPageCommission: React.Dispatch<React.SetStateAction<number>>;
    pageCommission: number;   // 👈 Necesitamos saber en qué página estás
    totalCommission: number;       // 👈 Total de registros en el backend
}

export function SectionCommission({ commissions, porcent, setPageCommission, pageCommission, totalCommission }: Props) {
  
  const limit = 10;
  const totalPages = Math.ceil(totalCommission / limit);

  const isFirstPage = pageCommission === 1;
  const isLastPage = pageCommission === totalPages || totalPages === 0;

  const handlePrev = () => {
    if (!isFirstPage) {
      setPageCommission((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      setPageCommission((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow border border-gray-300">
        <h3 className="text-base font-medium mb-2">Ventas a Comisionar</h3>
        <table className="w-full text-left text-xs">
            <thead className="border-b">
            <tr>
                <th className="py-1">Fecha</th>
                <th className="py-1">Total Venta</th>
                <th className="py-1">Comisión</th>
            </tr>
            </thead>
            <tbody>
            {commissions?.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                <td className="py-1">{new Date(a.date!).toLocaleDateString()}</td>
                <td className="py-1">{formatCurrency('$', a.total)}</td>
                <td className="py-1">{formatCurrency('$', (a.total * porcent) / 100)}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <div className="flex justify-around items-center mt-2">
        <button
          onClick={handlePrev}
          disabled={isFirstPage}
          className={`btn-text-blue`}
        >
          Anterior
        </button>

        <span className="text-xs">
          Página {pageCommission} de {totalPages || 1}
        </span>

        <button 
          onClick={handleNext}
          disabled={isLastPage}
          className={`btn-text-blue`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
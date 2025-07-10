import { SalaryAdvance } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";


interface Props {  
    advances: SalaryAdvance[] | null;
}

export function SectionAdvance({ advances }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow border border-gray-300">
        <h3 className="text-base font-medium mb-2">Adelantos</h3>
        <table className="w-full text-left text-xs">
            <thead className="border-b">
            <tr>
                <th className="py-1">Fecha</th>
                <th className="py-1">Monto</th>
                <th className="py-1">Razón</th>
            </tr>
            </thead>
            <tbody>
            {advances?.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                <td className="py-1">{new Date(a.createdAt!).toLocaleDateString()}</td>
                <td className="py-1">{formatCurrency('$', a.amount)}</td>
                <td className="py-1">{a.reason || "Sin Observación"}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  );
}
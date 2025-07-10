import { PayrollEmployee } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";

interface Props {
    payroll: PayrollEmployee | null;
    hasCommission?: boolean;
}

export function SectionTotal({ payroll, hasCommission = false }: Props) {
  return (
        <div className="bg-white p-4 rounded-xl shadow space-y-2 text-xs border border-gray-300">
            <div className="flex justify-between">
                <span>Salario base</span>
                <span>{formatCurrency('$', Number(payroll?.baseSalary) || 0)}</span>
            </div>
            {hasCommission && (
                <>
                <div className="flex justify-between">
                    <span>Total ventas</span>
                    <span>{formatCurrency('$', payroll?.totalSales || 0)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Cant. ventas</span>
                    <span>{payroll?.commissionCount || 0}</span>
                </div>
                <div className="flex justify-between">
                    <span>Comisiones</span>
                    <span>{formatCurrency('$', payroll?.commission || 0)}</span>
                </div>
                </>
            )}
            <div className="flex justify-between">
                <span>Extras</span>
                <span>{formatCurrency('$', Number(payroll?.bonuses) || 0)}</span>
            </div>
            <div className="flex justify-between">
                <span>Cant. Adelantos</span>
                <span>{payroll?.advancesCount || 0}</span>
            </div>
            <div className="flex justify-between">
                <span>Total adelantos</span>
                <span>- {formatCurrency('$', Number(payroll?.advances) || 0)}</span>
            </div>
            <div className="border-t pt-2 font-medium flex justify-between">
                <span>Salario neto</span>
                <span>{formatCurrency('$', (Number(payroll?.netSalary))|| 0)}</span>
            </div>
        </div>
  );
}
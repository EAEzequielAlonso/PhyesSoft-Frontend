// app/payroll-liquidation/page.tsx
"use client";

import { AdditionalLiquidation, SectionTotal, SectionAdvance } from "@/components";
import { fetchGetClient } from "@/fetchs/dashboard/crudFetchClient";
import { Employee, PayrollBonus, PayrollEmployee, SalaryAdvance, Sale } from "@/types";
import { useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { formatLocalDate } from "@/utils/formatLocalDate";
import { SectionCommission } from "@/components/dashboard/employee/section-commission";
import { useSearchParams } from "next/navigation";
import { FiCheck } from "react-icons/fi";


const PayrollLiquidationPage: React.FC = () => {
  
  const params = useSearchParams();
  const id = params.get("id");
  const { showToast } = useToast();
  // Form state
  const [periodStart, setPeriodStart] = useState<string>("");
  const [periodEnd, setPeriodEnd] = useState<string>("");
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [payroll, setPayroll] = useState<PayrollEmployee | null>(null);
  const [advances, setAdvances] = useState<SalaryAdvance[] | null>(null);
  const [commissions, setCommissions] = useState<Sale[]>([]); // Aquí deberías definir el tipo correcto
  const [pageCommission, setPageCommission] = useState<number>(1);
  const [totalCommission, setTotalCommission] = useState<number>(0); // Total

  // Bonos en esta liquidacion, se debe actualizar cada vez que se actualiza la tabla.
  const [payrollBonus, setPayrollBonus] = useState<PayrollBonus[] | null>(null);
  
  // Inicializacion de Datos
  useEffect(() => {
    // Aquí podrías cargar datos iniciales desde una API
    const fetchData = async () => {
    try {
      // recuperar empleados y adicionales
      const payrollEmployee: PayrollEmployee = await fetchGetClient(`payroll-employee/${id}`, '', 'Liquidación de Sueldo');

      setPayroll(payrollEmployee);
      setSelectedEmp(payrollEmployee.employee || null);
      setPeriodStart(payrollEmployee.periodStart || "");
      setPeriodEnd(payrollEmployee.periodEnd || "");
      setPayrollBonus(payrollEmployee.payrollBonuses || null);
      setAdvances(payrollEmployee.salaryAdvances || null);
      const sales: [Sale[], number]= await fetchGetClient(`sale/payrollEmployee/${payrollEmployee.employeeId}`, `page=1&limit=10`, 'Comisiones del Empleado');
      setCommissions(sales[0])
      setTotalCommission(sales[1])

    } catch (error) {
      console.error("Error al cargar Liquidación:", error);
      showToast(`Error al cargar La Liquidación de Sueldo: ${error}`, 'error');
    }
  };
  fetchData();
  }, []);

  return (
    <form
      className="min-h-screen p-4 bg-gray-50 text-sm font-sans space-y-6"
    >       
        {/* HEADER */}
        <div className="flex items-center justify-left mb-4">
      <h1 className="text-2xl font-bold">Liquidación de Sueldo</h1>

      {payroll?.isPaid && (
        <div className="flex items-center gap-2 ml-5">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white">
            <FiCheck className="w-4 h-4" />
          </div>
          <span className="text-green-600 font-semibold">Pagada</span>
        </div>
      )}
    </div>    
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT PANEL */}
            <div className="flex-1 space-y-6">
              
              {/* Extras section */}
              <AdditionalLiquidation setPayrollBonus={setPayrollBonus} readOnly={true} payrollBonus={payrollBonus}/>

              {/* Advances section */}
              <SectionAdvance advances={advances} />

              {/* Commission section */}
              {selectedEmp?.isSaler && (  
                <SectionCommission
                  commissions={commissions}
                  porcent={selectedEmp?.commission || 0}
                  setPageCommission={setPageCommission}
                  pageCommission={pageCommission}
                  totalCommission={totalCommission}
                />
              )}
            </div>
          {/* RIGHT PANEL */}
            <div className="w-full lg:w-1/3 space-y-4">
              {/* EMPLOYEE INFO */}
      <div className="bg-white p-4 rounded-xl shadow gap-2 text-xs border border-gray-300">
        <h2 className="text-lg font-semibold mb-2">Información del Empleado</h2>
        {selectedEmp ? (  
          <div className="space-y-2">
            <p><strong>Nombre:</strong> {selectedEmp.name}</p>
            <p><strong>DNI:</strong> {selectedEmp.dni}</p>
            <p><strong>CUIT:</strong> {selectedEmp.cuit}</p>
            <p><strong>Email:</strong> {selectedEmp.email}</p>
            <p><strong>Teléfono:</strong> {selectedEmp.phone}</p>
            <p><strong>Dirección:</strong> {selectedEmp.address}</p>
            <p><strong>Período:</strong> {`${formatLocalDate(periodStart)} - ${formatLocalDate(periodEnd)}`}</p>
          </div>
        ) : (
          <p className="text-gray-500">Seleccione un empleado para ver la información.</p>
        )}    
        </div>
              {/* Totales section */} 
              <SectionTotal payroll={payroll} hasCommission={selectedEmp?.isSaler} />
            </div>
        </div>
    </form>
  );
}

export default PayrollLiquidationPage;
// app/payroll-liquidation/page.tsx
"use client";

import { SelectEmployeePeriod, AdditionalLiquidation, SectionTotal, SectionAdvance, SectionSave } from "@/components";
import { fetchGetClient, fetchPost } from "@/fetchs/dashboard/crudFetchClient";
import { Employee, PayrollBonus, PayrollEmployee, SalaryAdvance, Sale } from "@/types";
import { useState, useEffect, FormEvent } from "react";
import { useToast } from "@/context/ToastContext";
import { formatLocalDate } from "@/utils/formatLocalDate";
import { SectionCommission } from "@/components/dashboard/employee/section-commission";
import { useRouter, useSearchParams } from "next/navigation";


const PayrollLiquidationPage: React.FC = () => {
  
  const searchParams = useSearchParams();
  const createAdd = searchParams.get('createAdd');
  const router = useRouter();
  const { showToast } = useToast();
  // Form state
  const [employeeId, setEmployeeId] = useState<string>("");
  const [periodStart, setPeriodStart] = useState<string>("");
  const [periodEnd, setPeriodEnd] = useState<string>("");
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [payroll, setPayroll] = useState<PayrollEmployee | null>(null);
  const [advances, setAdvances] = useState<SalaryAdvance[] | null>(null);
  const [commissions, setCommissions] = useState<Sale[]>([]); // Aquí deberías definir el tipo correcto
  const [pageCommission, setPageCommission] = useState<number>(1);
  const [totalCommission, setTotalCommission] = useState<number>(0); // Total

   // Options
  const [payAndSave, setPayAndSave] = useState(true);
  const [sendEmail, setSendEmail] = useState(false);

  // Bonos en esta liquidacion, se debe actualizar cada vez que se actualiza la tabla.
  const [payrollBonus, setPayrollBonus] = useState<PayrollBonus[] | null>(null);
  
  // Inicializacion de Datos
  useEffect(() => {
    // Aquí podrías cargar datos iniciales desde una API
    const fetchData = async () => {
    try {
      // recuperar empleados y adicionales
      const allEmployees = await fetchGetClient('employees/commerce', '', 'Empleados');
      setEmployees(allEmployees);

      // Calcular inicio y fin del mes actual
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      setPeriodStart(firstDay.toISOString().split('T')[0]); // YYYY-MM-DD
      setPeriodEnd(lastDay.toISOString().split('T')[0]);
    } catch (error) {
      console.error("Error al cargar empleados:", error);
      showToast(`Error al cargar empleados: ${error}`, 'error');
    }
  };


  fetchData();
  }, []);

  useEffect(() => {
  
  const fetchData = async () => {
    try {
      if (employeeId !== "") {
          const advancesEmployee = await fetchGetClient(`salary-advance/employee-forpay/${employeeId}?periodEnd=${periodEnd}`, '', 'Adelanto de Salarios');
          setAdvances(advancesEmployee);
          setPayroll((prev) => (
          prev ? {
          ...prev,
          isPaid: payAndSave,
          baseSalary: selectedEmp?.baseSalary || 0,
          periodStart,
          periodEnd,
          employeeId
        } : null));
      }

      if (selectedEmp?.isSaler) {
        const TotalSaleForEmployee: {
          totalSales: number;
          commissionCount: number;
          commission: number;
        } = await fetchGetClient(`sale/employeeCommission/${employeeId}`, `startDate=${periodStart}&endDate=${periodEnd}`, 'Adelanto de Salarios');
        
        setPayroll((prev) => (
          prev ? {
          ...prev,
          totalSales: TotalSaleForEmployee.totalSales || 0,
          commissionCount: TotalSaleForEmployee.commissionCount || 0, 
          commission: TotalSaleForEmployee.commission || 0,
          netSalary: Number(prev.baseSalary || 0) + (TotalSaleForEmployee.commission || 0) + (prev.bonuses || 0) - (prev.advances || 0),
        } : null));

        const commissionsEmployee = await fetchGetClient(`sale/employeeCommissionList/${employeeId}`, `startDate=${periodStart}&endDate=${periodEnd}&page=${pageCommission}&limit=${10}`, 'Comisiones del Empleado');
        setCommissions(commissionsEmployee[0]);
        setTotalCommission(commissionsEmployee[1] || 0); // Asumiendo que el segundo elemento es el total de comisiones
      }

      // hay que ver si viene el empleado en el parametro de pagina, en ese caso tengo que evantar tambien los bonus.
    } catch (error) {
      console.error("Error al cargar empleados:", error);
      showToast(`Error al cargar La informacion del empleado: ${error}`, 'error');
    }
  };

  fetchData();

  }, [employeeId, periodStart, periodEnd]);

  useEffect(() => {
    const bonusesAux = payrollBonus?.reduce((acc, bonus) => acc + (bonus.amount * bonus.quantity), 0) || 0;
    setPayroll((prev) => (
        {
        ...prev!,
        bonuses: bonusesAux,
        netSalary: Number(prev?.baseSalary || 0) + (prev?.commission || 0) + (bonusesAux || 0) - (prev?.advances || 0),
      } ));
    }, [payrollBonus]);

  useEffect(() => {
    const advancesAux = advances?.reduce((acc, a) => acc + (a.amount || 0), 0) || 0;
    setPayroll((prev) => (
          prev ? {
          ...prev,
          advancesCount: advances?.length || 0,
          advances: advancesAux,
          netSalary: Number(prev.baseSalary) + (prev.commission || 0) + (prev.bonuses || 0) - (advancesAux || 0),
        } : null));
    }, [advances]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!employeeId || !periodStart || !periodEnd) {
      showToast("Por favor, complete todos los campos requeridos.", 'error');
      console.log({ employeeId, periodStart, periodEnd });
      return;
    }
    await fetchPost('payroll-employee', 'Liquidación de Sueldo', {
      ...payroll,
      salaryAdvances: advances,
      payrollBonuses: payrollBonus,
    })
    .then((data) => {
      console.log("Liquidación guardada:", data);
      showToast("Liquidación guardada correctamente.", 'success');

      // Aquí podrías redirigir o limpiar el formulario si esta en varios solo limpio. si no esta en varios redirijo a la lista.
      if (!createAdd) {
        router.push('/dashboard/employee/payroll-employee');
        return;
      }
      setPayroll(null);
      setAdvances([]);
      setPayrollBonus([]);
      setSelectedEmp(null);
      setEmployeeId("");
      setPeriodStart("");
      setPeriodEnd("");
    })  
    .catch((error) => {
      console.error("Error al guardar la liquidación:", error);
      showToast(`Error al guardar la liquidación: ${error}`, 'error');
      return
    });

    if (sendEmail) {
      // Aquí podrías llamar a tu API para enviar el correo electrónico
      console.log("Enviando correo electrónico de liquidación...");
      showToast("Correo electrónico de liquidación enviado.", 'success');
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="min-h-screen p-4 bg-gray-50 text-sm font-sans space-y-6"
    >      
        {/* HEADER */}
              <SelectEmployeePeriod
                periodStart={periodStart}
                periodEnd={periodEnd}
                employees={employees}
                setEmployeeId={setEmployeeId}
                setSelectedEmp={setSelectedEmp}
                setPeriodStart={setPeriodStart}
                setPeriodEnd={setPeriodEnd}
              />
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT PANEL */}
            <div className="flex-1 space-y-6">
              

              {/* Extras section */}
              <AdditionalLiquidation setPayrollBonus={setPayrollBonus} />

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

              {/* Save section */}
              <SectionSave payAndSave={payAndSave} sendEmail={sendEmail} setPayAndSave={setPayAndSave} setSendEmail={setSendEmail} />
            </div>
        </div>
    </form>
  );
}

export default PayrollLiquidationPage;
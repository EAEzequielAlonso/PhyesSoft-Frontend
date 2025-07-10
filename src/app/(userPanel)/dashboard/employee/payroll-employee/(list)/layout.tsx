import {LayoutCrudPrincipal} from "@/components/dashboard"

export default function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className = "pt-5 w-2/3 m-auto">
        <LayoutCrudPrincipal endpoint="employee/payroll-employee" title="Gestión de Liquidación de Sueldos" needFilter={true}/>
        {children}
    </div>
  );
}

import { LayoutCrudPrincipal } from "@/components/dashboard";

export default function CrudLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className = "pt-5 w-3/4 m-auto">
        <LayoutCrudPrincipal endpoint="employee/payroll-employee" title="Gestión de Liquidación de Sueldos" needFilter={false}/>
        {children}
    </div>
  );
}

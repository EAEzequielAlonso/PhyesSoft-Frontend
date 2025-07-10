import {LayoutCrudPrincipal} from "@/components/dashboard"

export default function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className = "pt-5 w-2/3 m-auto">
        <LayoutCrudPrincipal endpoint="employee/employee-role" title="Gestión de Roles de Empleados" needFilter={true}/>
        {children}
    </div>
  );
}

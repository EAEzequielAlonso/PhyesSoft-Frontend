import { LayoutCrudPrincipal } from "@/components/dashboard";

export default function CrudLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className = "pt-5 w-2/3 m-auto">
        <LayoutCrudPrincipal endpoint="employee/employees" title="Gestión de Empleados" needFilter={false}/>
        {children}
    </div>
  );
}

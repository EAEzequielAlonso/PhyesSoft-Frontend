import { LayoutCrudPrincipal } from "@/components/dashboard";

export default function CrudLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className = "pt-5 w-2/3 m-auto">
        <LayoutCrudPrincipal endpoint="employee/salary-advance" title="Gestión de Adelantos de Sueldo" needFilter={false}/>
        {children}
    </div>
  );
}

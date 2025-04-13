import { LayoutCrudPrincipal } from "@/components";

export default function CrudLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className = "pt-5 w-2/3 m-auto">
        <LayoutCrudPrincipal endpoint="sales/movement-type" title="Gestión de Tipos de Movimientos" needFilter={false}/>
        {children}
    </div>
  );
}

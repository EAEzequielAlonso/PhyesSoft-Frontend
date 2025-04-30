import {LayoutCrudPrincipal} from "@/components/dashboard"

export default function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className = "pt-5 w-2/3 m-auto">
        <LayoutCrudPrincipal endpoint="administration/sale-point" title="Gestión de Puntos de Venta" needFilter={true}/>
        {children}
    </div>
  );
}

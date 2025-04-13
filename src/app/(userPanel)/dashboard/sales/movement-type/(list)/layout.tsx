import {LayoutCrudPrincipal} from "@/components/"

export default function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className = "pt-5 w-2/3 m-auto">
        <LayoutCrudPrincipal endpoint="sales/movement-type" title="Gestión de tipos de movimientos" needFilter={true}/>
        {children}
    </div>
  );
}

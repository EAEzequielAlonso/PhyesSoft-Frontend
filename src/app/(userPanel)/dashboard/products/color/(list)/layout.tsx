import {LayoutCrudPrincipal} from "@/components/"

export default function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className = "pt-5 w-2/3 m-auto">
        <LayoutCrudPrincipal endpoint="color" title="Gestión de Colores" needFilter={true}/>
        {children}
    </div>
  );
}

import {LayoutCrudPrincipal} from "@/components/dashboard"

export default function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className = "pt-5 w-2/3 m-auto">
        <LayoutCrudPrincipal endpoint="products/value-variant" title="Gestión de Valores de Variantes" needFilter={true}/>
        {children}
    </div>
  );
}

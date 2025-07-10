import {LayoutCrudPrincipal} from "@/components/dashboard"

export default function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className = "pt-5 w-2/3 m-auto">
        <LayoutCrudPrincipal endpoint="products/product-codbar" title="Gestión de Codigos de Barra" needFilter={false} withParam={true} />
        {children}
    </div>
  );
}

import { LayoutCrudPrincipal } from "@/components";

export default function CrudLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className = "pt-5 w-2/3 m-auto">
        <LayoutCrudPrincipal endpoint="product" title="Gestión de Productos" needFilter={false}/>
        {children}
    </div>
  );
}

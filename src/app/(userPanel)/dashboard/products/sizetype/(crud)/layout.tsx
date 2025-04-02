import { LayoutCrudPrincipal } from "@/components";

export default function CrudLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className = "pt-5 w-2/3 m-auto">
        <LayoutCrudPrincipal endpoint="sizetype" title="Gestión de Grupo de Talles" needFilter={false}/>
        {children}
    </div>
  );
}

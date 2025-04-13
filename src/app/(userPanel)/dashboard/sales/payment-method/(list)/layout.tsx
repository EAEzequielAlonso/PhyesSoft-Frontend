import {LayoutCrudPrincipal} from "@/components/"

export default function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className = "pt-5 w-2/3 m-auto">
        <LayoutCrudPrincipal endpoint="sales/payment-method" title="Gestión de Metodos de Pago" needFilter={true}/>
        {children}
    </div>
  );
}

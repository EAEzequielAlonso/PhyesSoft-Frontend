import {SubNavbar} from "@/components";
const section = "Productos"
const navItems = [
    { name: "Vender", path: "/dashboard/sales" },
    { name: "Caja Diaria", path: "/dashboard/sales/cash-day" },
    { name: "Ventas del Dia", path: "/dashboard/sales/salehistorial" },
    { name: "Formas de Pago", path: "/dashboard/sales/forma-pago" },
    { name: "Movimientos de Caja", path: "/dashboard/sales/mov-cash-day" },
    { name: "Tipos de Movimientos", path: "/dashboard/sales/type-mov" },
  ];

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (<>
        <SubNavbar navItems={navItems} section={section}/>     
        <section className= "p-2">{children}</section>
    </>
  );
}

import {SubNavbar} from "../../../../components/dashboard";
const section = "Ventas"
const navItems = [
    { name: "Ventas", path: "/dashboard/sales" },
    { name: "Caja Diaria", path: "/dashboard/sales/daily-cash" },
    { name: "Ventas Diarias", path: "/dashboard/sales/salehistorial" },
    { name: "Mov. de Caja Diarios", path: "/dashboard/sales/movement-BoxDaily" },
    { name: "Formas de Pago", path: "/dashboard/sales/payment-method" },
    { name: "Tipos de Movimientos", path: "/dashboard/sales/movement-type" },
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

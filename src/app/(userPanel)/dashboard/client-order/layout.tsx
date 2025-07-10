import {SubNavbar} from "@/components/dashboard";
const section = "Pedidos"
const navItems = [
    { name: "Nuevo Pedido", path: "/dashboard/client-order/new-order" },
    { name: "Pendientes", path: "/dashboard/client-order/pending-order" },
    { name: "Terminados", path: "/dashboard/client-order/finished-order" },
    { name: "Cobranzas", path: "/dashboard/client-order/finished-order" },
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

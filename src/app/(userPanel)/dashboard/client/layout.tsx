import {SubNavbar} from "@/components/dashboard";
const section = "Pedidos"
const navItems = [
    { name: "Clientes", path: "/dashboard/client/clients" },
    { name: "Cuenta Corriente", path: "/dashboard/client/current-acount" },
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

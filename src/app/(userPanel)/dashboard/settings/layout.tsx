import {SubNavbar} from "../../../../components/dashboard";
const section = "Configuraciones"
const navItems = [
    { name: "Productos", path: "/dashboard/settings/products" },
    { name: "Ventas", path: "/dashboard/settings/sales" }
  ];

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (<>
        <SubNavbar navItems={navItems} section={section}/>     
        <section className= "">{children}</section>
    </>
  );
}

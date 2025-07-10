import {SubNavbar} from "@/components/dashboard";
const section = "Proveedores"

const navItems = [
    { name: "Proveedor", path: "/dashboard/providers/provider" },
    { name: "Cuenta Corriente", path: "/dashboard/providers/current-acount" },
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

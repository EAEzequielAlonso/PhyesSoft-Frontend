import {SubNavbar} from "@/components/dashboard";
const section = "Comercio"
const navItems = [
    { name: "Comercio", path: "/dashboard/administration/commerce" },
    { name: "Sucursales", path: "/dashboard/administration/branch" },
    { name: "Usuarios y Roles", path: "/dashboard/administration/user-and-roles" },
    { name: "Puntos de venta", path: "/dashboard/administration/sale-point" },
    { name: "Datos de Facturación", path: "/dashboard/administration/fiscal-data" },
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

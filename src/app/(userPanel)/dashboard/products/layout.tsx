import {SubNavbar} from "@/components/dashboard";
const section = "Productos"
const navItems = [
    { name: "Productos", path: "/dashboard/products/product" },
    { name: "Categoría", path: "/dashboard/products/category" },
    { name: "Subcategoría", path: "/dashboard/products/subcategory" },
    { name: "Marca", path: "/dashboard/products/brand" },
    { name: "Modelo", path: "/dashboard/products/model" },
    { name: "Grupo de Talles", path: "/dashboard/products/sizetype" },
    { name: "Talles", path: "/dashboard/products/size" },
    { name: "Colores", path: "/dashboard/products/color" },
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

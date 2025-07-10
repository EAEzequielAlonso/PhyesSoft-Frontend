import {SubNavbar} from "@/components/dashboard";
const section = "Empleados"
const navItems = [
    { name: "Empleados", path: "/dashboard/employee/employees" },
    { name: "Roles de Empleado", path: "/dashboard/employee/employee-role" },
    { name: "Premios", path: "/dashboard/employee/bonus" },
    { name: "Adelantos", path: "/dashboard/employee/salary-advance" },
    { name: "Liquidacion de Sueldo", path: "/dashboard/employee/payroll-employee" },
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

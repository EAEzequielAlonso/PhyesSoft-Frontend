import { OpenFilterBox } from "@/components";
import { fetchData } from "@/fetchs/dashboard/crudFechServer";


export default async function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const branches = await fetchData("branch", "Sucursal", "");
  return (
    <div>
        <OpenFilterBox branches={branches[0]}/>
        {children}
    </div>
  );
}

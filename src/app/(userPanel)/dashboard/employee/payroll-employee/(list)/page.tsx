import {Pagination, Table} from "@/components/dashboard";
import { fetchData } from "@/fetchs/dashboard/crudFechServer";
import { Suspense } from "react";
import { ButtonAction, Columns, PayrollEmployee } from "@/types";
import { FiEye } from "react-icons/fi";

interface ListPageProps {
  searchParams: Promise <{
    search?: string;
    page?:string;
  }>;
}

export default async function ListPage({ searchParams }: ListPageProps) {
  
  const {search = "", page = "1"} = await searchParams;

  // datos Particulares de cada uno
  const columns:Columns<PayrollEmployee>[] = [
    {key:"employee", label:"Nombre Empleado", type: "object"},
    {key:"periodStart", label:"Inicio del Periodo", type: "date"},
    {key:"periodEnd", label:"Fin del Periodo", type: "date"},
    {key:"netSalary", label:"Sueldo Neto", type: "price"},
    {key:"isPaid", label:"Pagado", type: "boolean"},
  ]
  const endpoint = "payroll-employee"
  const section = "employee"
  const label = "Liquidación de Sueldo"

  const actions:ButtonAction<PayrollEmployee>[] = [
    { href:`/dashboard/${section}/${endpoint}/view`, nameParam: "id", color: "blue", icon: <FiEye />, title: "Ver Liquidación"}
  ]

  const datafromfetch = await fetchData(endpoint, label, `search=${search}&page=${page}`);
  const data = datafromfetch[0];
  const limit = 10;
  const totalPages = Math.ceil(datafromfetch[1] / limit);

  return (
    <>
      <div className="flex justify-center items-center">
            <Table<PayrollEmployee> data={data} endpoint={endpoint} section={section} label={label} columns={columns} canEdit={false} actions={actions} />
      </div>
      <Suspense fallback={<p>Cargando Paginación...</p>}>
        <Pagination page={+page} totalPages={totalPages ? totalPages : 1} endpoint={endpoint} />
      </Suspense>
    </>
  );
}

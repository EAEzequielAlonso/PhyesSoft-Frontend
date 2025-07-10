import {Pagination, Table} from "@/components/dashboard";
import { fetchData } from "@/fetchs/dashboard/crudFechServer";
import { Suspense } from "react";
import { ButtonAction, Columns, Employee } from "@/types";
import { FaMoneyBillWave } from 'react-icons/fa';

interface ListPageProps {
  searchParams: Promise <{ 
    search?: string;
    page?:string;
  }>;
}

export default async function ListPage({ searchParams }: ListPageProps) {
  
  const {search = "", page = "1"} = await searchParams;

  // datos Particulares de cada uno
  const columns:Columns<Employee>[] = [
    {key:"name", label:"Nombre", type: "text"},
    {key:"role", label:"Rol", type: "object"}
  ]
  const endpoint = "employees";
  const section = "employee"
  const label = "Empleado"

  const actions:ButtonAction<Employee>[] = [
    { href:`/dashboard/${section}/salary-advance/new`, nameParam: "id", color: "blue", icon: <FaMoneyBillWave />, title: "Retiro Adelantado"}
  ]

  const datafromfetch = await fetchData(endpoint, label, `search=${search}&page=${page}`);
  const data = datafromfetch[0];
  const limit = 10;
  const totalPages = Math.ceil(datafromfetch[1] / limit);

  return (
    <>
      <div className="flex justify-center items-center">
            <Table<Employee> data={data} endpoint={endpoint} section={section} label={label} columns={columns} actions={actions} />
      </div>
      <Suspense fallback={<p>Cargando Paginación...</p>}>
        <Pagination page={+page} totalPages={totalPages ? totalPages : 1} endpoint={endpoint} />
      </Suspense>
    </>
  );
}

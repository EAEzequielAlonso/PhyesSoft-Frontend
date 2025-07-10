import {Pagination, Table} from "@/components/dashboard";
import { fetchData } from "@/fetchs/dashboard/crudFechServer";
import { Suspense } from "react";
import { Bonus, Columns } from "@/types";

interface ListPageProps {
  searchParams: Promise <{ 
    search?: string;
    page?:string;
  }>;
}

export default async function ListPage({ searchParams }: ListPageProps) {
  
  const {search = "", page = "1"} = await searchParams;

  // datos Particulares de cada uno
  const columns:Columns<Bonus>[] = [
    {key:"name", label:"Nombre", type: "text"}, 
    {key:"value", label:"Valor", type: "price"},
    {key:"isActive", label:"¿Activo?", type: "boolean"}
  ]
  const endpoint = "bonus";
  const section = "employee"
  const label = "Premio de Empleados"

  const datafromfetch = await fetchData(endpoint, label, `search=${search}&page=${page}`);
  const data = datafromfetch[0];
  const limit = 10;
  const totalPages = Math.ceil(datafromfetch[1] / limit);

  return (
    <>
      <div className="flex justify-center items-center">
            <Table<Bonus> data={data} endpoint={endpoint} section={section} label={label} columns={columns} />
      </div>
      <Suspense fallback={<p>Cargando Paginación...</p>}>
        <Pagination page={+page} totalPages={totalPages ? totalPages : 1} endpoint={endpoint} />
      </Suspense>
    </>
  );
}

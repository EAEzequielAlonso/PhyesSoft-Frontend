import {Pagination, Table} from "@/components";
import { fetchData } from "@/fetchs/dashboard/crudFechServer";
import { Branch } from "@/types";
import { Suspense } from "react";
import { Columns } from "@/types";

interface ListPageProps {
  searchParams: Promise <{ 
    search?: string;
    page?:string;
  }>;
}

export default async function ListPage({ searchParams }: ListPageProps) {
  
  const {search = "", page = "1"} = await searchParams;

  // datos Particulares de cada uno
  const columns:Columns<Branch>[] = [
    {key:"name", label:"Nombre", type: "text"},
    {key:"address", label:"Dirección", type: "text"},
    {key:"fiscalData", label:"Razon Social", type: "object"}
  ]
  const endpoint = "branch";
  const section = "administration"
  const label = "Sucursal"

  const datafromfetch = await fetchData(endpoint, label, `search=${search}&page=${page}`);
  const data = datafromfetch[0];
  const limit = 10;
  const totalPages = Math.ceil(datafromfetch[1] / limit);

  return (
    <>
      <div className="flex justify-center items-center">
            <Table<Branch> data={data} endpoint={endpoint} section={section} label={label} columns={columns} />
      </div>
      <Suspense fallback={<p>Cargando Paginación...</p>}>
        <Pagination page={+page} totalPages={totalPages ? totalPages : 1} endpoint={endpoint} />
      </Suspense>
    </>
  );
}

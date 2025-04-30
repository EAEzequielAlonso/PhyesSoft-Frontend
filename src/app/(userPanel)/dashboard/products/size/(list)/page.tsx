import {Pagination, Table} from "@/components/dashboard";
import { fetchData } from "@/fetchs/dashboard/crudFechServer";
import { Size } from "@/types";
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
  const columns:Columns<Size>[] = [{key:"name", label:"Nombre"}, {key:"sizetype", label:"Grupo de Talles"}]
  const endpoint = "size";
  const section = "products"
  const label = "Talle"

  const datafromfetch = await fetchData(endpoint, label, `search=${search}&page=${page}`);
  const data = datafromfetch[0];

  const limit = 10;
  const totalPages = Math.ceil(datafromfetch[1] / limit);

  return (
    <>
      <div className="flex justify-center items-center">
            <Table<Size> data={data} endpoint={endpoint} section={section} label={label} columns={columns} />
      </div>
      <Suspense fallback={<p>Cargando Paginación...</p>}>
        <Pagination page={+page} totalPages={totalPages ? totalPages : 1} endpoint={endpoint} />
      </Suspense>
    </>
  );
}

import {Table} from "@/components/dashboard";
import { fetchData } from "@/fetchs/dashboard/crudFechServer";
import { CashMovement } from "@/types";
import { Columns } from "@/types";
import Link from "next/link";

interface ListPageProps {
  searchParams: Promise <{ 
    branch?:string;
    boxCash?: string;
    dailyCashId?: string;
    search?: string;
    page?:string;
  }>;
}

export default async function ListPage({ searchParams }: ListPageProps) {
  
  const {page = "1", branch = "", boxCash = "", dailyCashId = "", search = ""} = await searchParams;
  const endpointReturn = "/dashboard/sales/daily-cash"
  // datos Particulares de cada uno
  const columns:Columns<CashMovement>[] = [
    {key:"movementType", label:"Movimiento"}, 
    {key:"amount", label:"Monto"},
    {key:"description", label:"Descripción"},
  ]
  const endpoint = "cash-movement";
  const section = "sales"
  const label = "Movimiento de Caja"
  const limit = 10;

  const datafromfetch = await fetchData(endpoint, label, `search=${search}&dailyCashId=${dailyCashId}&page=${page}&limit=${limit}`);
  const data = datafromfetch[0];
  const totalPages = Math.ceil(datafromfetch[1] / limit);
  
  const urlPagination = `/dashboard/sales/cash-movement?branch=${branch}&boxCash=${boxCash}&dailyCashId=${dailyCashId}`
  return (
      <div className = "pt-5 w-2/3 m-auto">
        <div className="flex justify-between items-center gap-3 mb-1">
            <h2 className="my-auto">Movimientos en: <span className="text-slate-500">{branch} - {boxCash}</span></h2>
            <Link href={`${endpointReturn}`}>
              <button type="button" className="btn-text-blue ml-3">
                Ir a Cajas Diarias
              </button>
            </Link>
        </div>
        {/* Aca podria ir un filter para el description */}
        <div className="flex justify-center items-center">
            <Table<CashMovement> data={data} endpoint={endpoint} section={section} label={label} columns={columns} canEdit={false} />
        </div>
          <div className="container-pagination">
            { +page===1
              ? <button disabled> Anterior </button>
              : <Link href={`${urlPagination}&page=${+page-1}`}>
                  <button> Anterior </button>
                </Link>
            }
          
            <h2>{page} de {totalPages}</h2>

            { +page=== +totalPages
              ? <button disabled> Anterior </button>
              : <Link href={`${urlPagination}&page=${+page+1}`}>
                  <button> Siguiente </button>
                </Link>
            }
          </div>
        </div>
  );
}

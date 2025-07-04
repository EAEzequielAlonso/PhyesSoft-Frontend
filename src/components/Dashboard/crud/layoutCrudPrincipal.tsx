import Link from "next/link";
import { Suspense } from "react";
import { Filter } from "./filter";
import { LuCirclePlus, LuListPlus } from "react-icons/lu";

interface Props {
    endpoint: string;
    title: string;
    needFilter: boolean;
}

export function LayoutCrudPrincipal ({endpoint, title, needFilter = true} : Props) {
    return <>
        <div className="flex justify-between items-center gap-3 mb-1">
          <div>
            <Link href={`/dashboard/${endpoint}/new`}>
              <button className="btn-icon-orange mr-3"><LuCirclePlus/></button>
            </Link>
            <Link href={`/dashboard/${endpoint}/new?createAdd=true`}>
              <button className="btn-icon-orange mr-3"> <LuListPlus/> </button>
            </Link>
            {!needFilter && 
              <Link href={`/dashboard/${endpoint}`}>
                <button type="button" className="btn-text-blue ml-3">
                  Volver
                </button>
              </Link>
            }
          </div>
          <h2 className="my-auto">{title}</h2>
        </div>
        {needFilter && 
          <Suspense fallback={<p>Cargando Filtros...</p>}>
          <Filter 
            endpoint={endpoint} 
          />
        </Suspense> 
        }
    </>
}
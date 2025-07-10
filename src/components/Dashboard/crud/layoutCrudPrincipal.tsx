"use client"

import Link from "next/link";
import { Suspense } from "react";
import { Filter } from "./filter";
import { LuCirclePlus, LuListPlus } from "react-icons/lu";
import { useSearchParams } from "next/navigation";

interface Props {
    endpoint: string;
    title: string;
    needFilter: boolean;
    withParam?: boolean;
    back?: boolean;
}

export function LayoutCrudPrincipal ({endpoint, title, needFilter = true, withParam = false} : Props) {
  
  let id;
  if (withParam) {
    const searchParams = useSearchParams();  
    id = searchParams.get("id") || "";
   }
    return <>
        <div className="flex justify-between items-center gap-3 mb-1">
          <div>
            <Link href={`/dashboard/${endpoint}/new${withParam && `?id=${id}`}`}>
              <button className="btn-icon-orange mr-3"><LuCirclePlus/></button>
            </Link>
            <Link href={`/dashboard/${endpoint}/new?createAdd=true${withParam && `&id=${id}`}`}>
              <button className="btn-icon-orange mr-3"> <LuListPlus/> </button>
            </Link>
            {(!needFilter && !withParam) && 
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
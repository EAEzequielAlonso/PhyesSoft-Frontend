import { CardOpenBoxCash } from "@/components";
import { fetchData } from "@/fetchs/dashboard/crudFechServer";
import { DailyCash } from "@/types";

export default async function DailyCashPage() {

  const dailiesCash:DailyCash[] = await fetchData("daily-cash/open-daily-cash", "Cajas Diarias Abiertas", "") 
  const movType = await fetchData("movement-type/commerce", "Tipos de movimientos", "")
  
  return (
    <>
      {dailiesCash?.length === 0 
      ? <div className="felx justify-center items-center text-5xl text-slate-400 "> No Hay Cajas Abiertas</div>
      : <div className="flex justify-around flex-wrap ">
          {dailiesCash?.map(box => {
            return <CardOpenBoxCash 
                            key={box.id}
                            dailyCashId={box.id} 
                            boxCash={box.boxCash} 
                            branch={box.boxCash.branch!}
                            user={box.userOpen!}
                            movType={movType}/>
                          }
                        )}
        </div>
      }
        
    </>
  )
}

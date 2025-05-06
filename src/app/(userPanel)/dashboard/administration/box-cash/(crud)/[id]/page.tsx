import {CreateForm} from "@/components/dashboard";
import { BoxCash, FormCrud } from "@/types";
import { fetchDataOne, fetchDataRelation } from "@/fetchs/dashboard/crudFechServer";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function EditBrandPage ({params}: Props) {
    const id = (await params).id

    const endpoint = "box-cash";
        const section = "administration";
        const label = "Caja"; 
        const [branch, salePoint] = await Promise.all ([
            fetchDataRelation("branch", "Sucursal"),
            fetchDataRelation("sale-point", "Punto de Venta"),
        ])
    
        const formCrud: FormCrud<BoxCash>[] = [
            {label: "Nombre", elementForm: "text", key: "name"},
            {label: "Sucursal", elementForm: "select", key: "branchId", data: branch},
            {label: "Punto de Venta", elementForm: "select", key: "salePointId", data: salePoint},
        ]

    const data = await fetchDataOne(endpoint, label, id)

    return (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
            <CreateForm endpoint={endpoint} section={section} label={label} item={data} formCrud={formCrud}/>
        </div> 
    )
    
}
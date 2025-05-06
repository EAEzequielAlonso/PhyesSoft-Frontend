import {CreateForm} from "@/components/dashboard";
import { FormCrud, SalePoint } from "@/types";
import { fetchData, fetchDataOne } from "@/fetchs/dashboard/crudFechServer";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function EditBrandPage ({params}: Props) {
    const id = (await params).id

    // Datos a modificar de cada page.
    const endpoint = "sale-point";
    const section = "administration";
    const label = "Punto de Venta";
    const [emissionType] = await Promise.all ([
        fetchData("fiscal-data/emissiontype", "Tipo de emisión", ""),
    ])

    const formCrud: FormCrud<SalePoint>[] = [
        {label: "Codigo", elementForm: "text", key: "name"},
        {label: "Descripción", elementForm: "text", key: "description"},
        {label: "Tipo de Emisión", elementForm: "select", key: "emissionType", data: emissionType}
    ]

    const data = await fetchDataOne(endpoint, label, id)

    return (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
            <CreateForm endpoint={endpoint} section={section} label={label} item={data} formCrud={formCrud}/>
        </div> 
    )
    
}
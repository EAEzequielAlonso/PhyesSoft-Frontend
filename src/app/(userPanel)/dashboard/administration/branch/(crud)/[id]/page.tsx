import {CreateForm} from "@/components/dashboard";
import { Branch, FormCrud } from "@/types";
import { fetchDataOne, fetchDataRelation } from "@/fetchs/dashboard/crudFechServer";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function EditBrandPage ({params}: Props) {
    const brandId = (await params).id

    // Datos a modificar en cada page
    const endpoint = "branch";
    const section = "administration";
    const label = "Sucursal"
    const [fiscalData] = await Promise.all ([
                fetchDataRelation("fiscal-data", "Sucursal"),
            ])
        const formCrud: FormCrud<Branch>[] = [
            {label: "Nombre", elementForm: "text", key: "name"},
            {label: "Dirección", elementForm: "text", key: "address"},
            {label: "Ciudad", elementForm: "text", key: "city"},
            {label: "Telefono", elementForm: "number", key: "phone"},
            {label: "Email de Sucursal", elementForm: "email", key: "emailBranch"},
            {label: "Datos Fiscales", elementForm: "select", key: "fiscalDataId", data: fiscalData},
            {label: "Inicio de Actividad", elementForm: "date", key: "initDate"},
            {label: "Es La Central", elementForm: "checkbox", key: "central"},
        ]

    const data = await fetchDataOne(endpoint, label, brandId)

    return (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
            <CreateForm endpoint={endpoint} section={section} label={label} item={data} formCrud={formCrud}/>
        </div> 
    )
    
}
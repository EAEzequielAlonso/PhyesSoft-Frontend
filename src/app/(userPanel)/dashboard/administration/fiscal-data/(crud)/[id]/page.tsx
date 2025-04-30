import {CreateForm} from "@/components/dashboard";
import { EmitionType, FormCrud, SalePoint } from "@/types";
import { fetchDataOne, fetchDataRelation } from "@/fetchs/dashboard/crudFechServer";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function EditBrandPage ({params}: Props) {
    const id = (await params).id

        const dataEmitionType = [
            {id: EmitionType.ELECTRONICO, name: EmitionType.ELECTRONICO},
            {id: EmitionType.FISCAL, name: EmitionType.FISCAL},
            {id: EmitionType.MANUAL, name: EmitionType.MANUAL},
        ]

    // Datos a modificar de cada page.
    const endpoint = "sale-point";
    const section = "administration";
    const endpointRelatin = "branch";
    const label = "Sucursal";
    const dataRelation = await fetchDataRelation(endpointRelatin, label);
    const formCrud: FormCrud<SalePoint>[] = [
        {label: "Codigo", elementForm: "text", key: "name"},
        {label: "Descripción", elementForm: "text", key: "description"},
        {label: "Tipo de Emisión", elementForm: "select", key: "emitionType", data: dataEmitionType},
        {label: "Sucursal", elementForm: "select", key: "branchId", data: dataRelation}
    ]

    const data = await fetchDataOne(endpoint, label, id)

    return (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
            <CreateForm endpoint={endpoint} section={section} label={label} item={data} formCrud={formCrud}/>
        </div> 
    )
    
}
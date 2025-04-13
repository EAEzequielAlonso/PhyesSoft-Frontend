import {CreateForm} from "@/components";
import { FormCrud, Size } from "@/types";
import { fetchDataOne, fetchDataRelation } from "@/utils/crudFechServer";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function EditBrandPage ({params}: Props) {
    const id = (await params).id

    // Datos a modificar en cada page
    const endpoint = "size";
    const section ="products"
    const endpointRelation = "sizetype";
    const label = "Talle"
    const dataRelation = await fetchDataRelation(endpointRelation, label);
    const formCrud: FormCrud<Size>[] = [
            {label: "Nombre", elementForm: "text", key: "name"},
            {label: "Grupo de Talles", elementForm: "select", key: "sizetypeId", data: dataRelation}
        ]

    const data = await fetchDataOne(endpoint, label, id)

    return (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
            <CreateForm endpoint={endpoint} section={section} label={label} item={data} formCrud={formCrud}/>
        </div> 
    )
    
}
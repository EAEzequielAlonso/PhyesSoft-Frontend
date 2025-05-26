import {CreateForm} from "@/components/dashboard";
import { FormCrud, ValueVariant } from "@/types";
import { fetchDataOne, fetchDataRelation } from "@/fetchs/dashboard/crudFechServer";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function EditBrandPage ({params}: Props) {
    const id = (await params).id

    // Datos a modificar en cada page
    const endpoint = "value-variant";
    const section ="products"
    const endpointRelatin = "variant";
    const label = "Valor de Variantes";
    const dataRelation = await fetchDataRelation(endpointRelatin, label);
    const formCrud: FormCrud<ValueVariant>[] = [
        {label: "Nombre", elementForm: "text", key: "name"},
        {label: "Variante", elementForm: "select", key: "variantId", data: dataRelation}
    ]

    const data = await fetchDataOne(endpoint, label, id)

    return (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
            <CreateForm endpoint={endpoint} section={section} label={label} item={data} formCrud={formCrud}/>
        </div> 
    )
    
}
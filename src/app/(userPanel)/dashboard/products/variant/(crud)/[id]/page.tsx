import {CreateForm} from "@/components/dashboard";
import { FormCrud, Variant } from "@/types";
import { fetchDataOne } from "@/fetchs/dashboard/crudFechServer";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function EditBrandPage ({params}: Props) {
    const id = (await params).id

    // Datos a modificar en cada page
    // Datos a modificar de cada page.
    const endpoint = "variant";
    const section ="products"
    const label = "Variante";
    const formCrud: FormCrud<Variant>[] = [
        {label: "Nombre", elementForm: "text", key: "name"}
    ]

    const data = await fetchDataOne(endpoint, label, id)

    return (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
            <CreateForm endpoint={endpoint} section={section} label={label} item={data} formCrud={formCrud}/>
        </div> 
    )
    
}
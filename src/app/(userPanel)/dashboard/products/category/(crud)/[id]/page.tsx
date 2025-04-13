import {CreateForm} from "@/components";
import { Category, FormCrud } from "@/types";
import { fetchDataOne } from "@/utils/crudFechServer";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function EditBrandPage ({params}: Props) {
    const id = (await params).id

    // Datos a modificar en cada page
    const endpoint = "category";
    const section= "products"
    const label = "Categoria"
    const formCrud: FormCrud<Category>[] = [
            {label: "Nombre", elementForm: "text", key: "name"}
        ]

    const data = await fetchDataOne(endpoint, label, id)
    
    return (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
            <CreateForm endpoint={endpoint} section={section} label={label} item={data} formCrud={formCrud}/>
        </div> 
    )
    
}
import {CreateForm} from "@/components";
import { Brand, FormCrud } from "@/types";
import { fetchDataOne } from "@/utils/crudFechServer";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function EditBrandPage ({params}: Props) {
    const brandId = (await params).id

    // Datos a modificar en cada page
    const endpoint = "brand";
    const label = "Marca"
    const formCrud: FormCrud<Brand>[] = [
            {label: "Nombre", elementForm: "text", key: "name"}
        ]

    const data = await fetchDataOne(endpoint, label, brandId)

    return (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
            <CreateForm endpoint={endpoint} label={label} item={data} formCrud={formCrud}/>
        </div> 
    )
    
}
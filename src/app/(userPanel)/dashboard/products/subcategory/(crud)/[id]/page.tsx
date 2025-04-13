import {CreateForm} from "@/components";
import { FormCrud, Subcategory } from "@/types";
import { fetchDataOne, fetchDataRelation } from "@/utils/crudFechServer";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function EditBrandPage ({params}: Props) {
    const brandId = (await params).id

    // Datos a modificar en cada page
    const endpoint = "subcategory";
    const section = "products";
    const endpointRelation = "category";
    const label = "Subcategoria"
    const dataRelation = await fetchDataRelation(endpointRelation, label);
    const formCrud: FormCrud<Subcategory>[] = [
            {label: "Nombre", elementForm: "text", key: "name"},
            {label: "Categoria", elementForm: "select", key: "categoryId", data: dataRelation}
        ]

    const data = await fetchDataOne(endpoint, label, brandId)

    return (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
            <CreateForm endpoint={endpoint} section={section}label={label} item={data} formCrud={formCrud}/>
        </div> 
    )
    
}
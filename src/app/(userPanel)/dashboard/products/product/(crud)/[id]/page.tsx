import {CreateForm} from "@/components/dashboard";
import { FormCrud, Product} from "@/types";
import { fetchDataOne, fetchDataRelation } from "@/fetchs/dashboard/crudFechServer";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function EditBrandPage ({params}: Props) {
    const id = (await params).id

    // Datos a modificar en cada page
    const endpoint = "product";
    const section = "products"
    const label = "Producto"
    const [brand, model, category, subcategory, sizetype] = await Promise.all ([
        fetchDataRelation("brand", "Marca"),
        fetchDataRelation("model", "Modelo"),
        fetchDataRelation("category", "Categoria"),
        fetchDataRelation("subcategory", "Subcategoria"),
        fetchDataRelation("sizetype", "Grupo de Talles"),
    ])
    const formCrud: FormCrud<Product>[] = [
            {label: "Nombre", elementForm: "text", key: "name"},
            {label: "Descripción", elementForm: "text", key: "description"},
            {label: "Costo", elementForm: "number", key: "cost"},
            {label: "Utilidad", elementForm: "number", key: "profit"},
            {label: "Precio", elementForm: "number", key: "price"},
            {label: "Marca", elementForm: "select", key: "brandId", data: brand},
            {label: "Modelo", elementForm: "select", key: "modelId", data: model},
            {label: "Categoria", elementForm: "select", key: "categoryId", data: category},
            {label: "Subcategoria", elementForm: "select", key: "subcategoryId", data: subcategory},
            {label: "Grupo de Talles", elementForm: "select", key: "sizetypeId", data: sizetype},
        ]

    const data = await fetchDataOne(endpoint, label, id)

    return (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
            <CreateForm endpoint={endpoint} section={section} label={label} item={data} formCrud={formCrud}/>
        </div> 
    )
    
}
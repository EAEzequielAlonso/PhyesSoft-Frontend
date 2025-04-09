import { FormCrud, Product } from "@/types";
import {CreateForm} from "@/components";
import { fetchDataRelation } from "@/utils/crudFechServer";

interface Props {
    searchParams: Promise<{
        createAdd?: boolean
    }>
}

const NewBrand: React.FC<Props> = async ({searchParams}) => {

    const createAdd = (await searchParams).createAdd

    // Datos a modificar de cada page.
    const endpoint = "product";
    const label = "Producto";
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
        {label: "Marca", elementForm: "select", key: "brandId", data: brand, relation: "modelId"},
        {label: "Modelo", elementForm: "select", key: "modelId", data: model},
        {label: "Categoria", elementForm: "select", key: "categoryId", data: category, relation: "subcategoryId"},
        {label: "Subcategoria", elementForm: "select", key: "subcategoryId", data: subcategory},
        {label: "Grupo de Talles", elementForm: "select", key: "sizetypeId", data: sizetype},
    ]

    return createAdd ? (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
          <CreateForm endpoint={endpoint} label={label} varios={true} formCrud={formCrud}/>
        </div>
    ) : (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
        <CreateForm endpoint={endpoint} label={label} formCrud={formCrud}/>
      </div> 
    )
}

export default NewBrand;
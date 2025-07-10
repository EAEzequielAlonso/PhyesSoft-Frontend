import {CreateForm} from "@/components/dashboard";
import { FormCrud, Product} from "@/types";
import { fetchData, fetchDataOne, fetchDataRelation } from "@/fetchs/dashboard/crudFechServer";

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
    const [brand, model, category, subcategory, sizetype, variant, iva, provider, types] = await Promise.all ([
            fetchDataRelation("brand", "Marca"),
            fetchDataRelation("model", "Modelo"),
            fetchDataRelation("category", "Categoria"),
            fetchDataRelation("subcategory", "Subcategoria"),
            fetchDataRelation("sizetype", "Grupo de Talles"),
            fetchDataRelation("variant", "Variantes"),
            fetchData("iva", "IVA", "" ),
            fetchDataRelation("provider", "Proveedores"),
            fetchData("product/types", "Tipos de Productos", ""),
        ])
    const formCrud: FormCrud<Product>[] = [
            {label: "Codigo", elementForm: "text", key: "code"},
        {label: "Nombre", elementForm: "text", key: "name", required:true},
        {label: "Descripción", elementForm: "text", key: "description"},
        {label: "Imagen", elementForm: "text", key: "image"},

        {label: "Cant x Venta", elementForm: "number", key: "buyUnit", defaultValue: 1},
        {label: "Cant x Compra", elementForm: "number", key: "saleUnit", defaultValue: 1},
        {label: "Costo", elementForm: "number", key: "cost", defaultValue: 0},
        {label: "Utilidad", elementForm: "number", key: "profit", defaultValue: 0},
        {label: "Precio", elementForm: "number", key: "price", required:true, defaultValue: 0},

        {label: "¿Activo?", elementForm: "checkbox", key: "isActive", defaultValue: true },
        {label: "¿Se discrimina por color?", elementForm: "checkbox", key: "hasColor", defaultValue: false },
        {label: "¿Es un pack de productos?", elementForm: "checkbox", key: "isPackComp", defaultValue: false },
        {label: "¿Se Vende a Clientes?", elementForm: "checkbox", key: "isSellable", defaultValue: true },
        {label: "¿Se compra a proveedores?", elementForm: "checkbox", key: "isBuyable", defaultValue: true },
        {label: "¿Es insumo interno?", elementForm: "checkbox", key: "isInsumo", defaultValue: false },
        {label: "¿Es materia prima de otro producto?", elementForm: "checkbox", key: "isRawMaterial", defaultValue: false },

        {label: "Marca", elementForm: "select", key: "brandId", data: brand, relation: "modelId"},
        {label: "Modelo", elementForm: "select", key: "modelId", data: model},
        {label: "Categoria", elementForm: "select", key: "categoryId", data: category, relation: "subcategoryId"},
        {label: "Subcategoria", elementForm: "select", key: "subcategoryId", data: subcategory},
        {label: "Grupo de Talles", elementForm: "select", key: "sizetypeId", data: sizetype},
        {label: "Variantes", elementForm: "select", key: "variantId", data: variant},
        {label: "Tipo", elementForm: "select", key: "producttypeId", data: types},
        {label: "IVA en Compra", elementForm: "select", key: "ivaBuyId", data: iva},
        {label: "IVA en Venta", elementForm: "select", key: "ivaSaleId", data: iva},
        {label: "Proveedor", elementForm: "select", key: "providerId", data: provider}
        ]

    const data = await fetchDataOne(endpoint, label, id)

    return (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
            <CreateForm endpoint={endpoint} section={section} label={label} item={data} formCrud={formCrud}/>
        </div> 
    )
    
}
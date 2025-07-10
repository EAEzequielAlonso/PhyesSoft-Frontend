import { FormCrud, ProductCodbar } from "@/types";
import {CreateForm} from "@/components/dashboard";
import { fetchDataOne, fetchDataRelation } from "@/fetchs/dashboard/crudFechServer";
import { redirect } from "next/navigation";

interface Props {
    searchParams: Promise<{
        createAdd?: boolean
        id?: string;
    }>
}

const NewBrand: React.FC<Props> = async ({searchParams}) => {

    const {createAdd, id} = (await searchParams)

    // Datos a modificar de cada page.
    const endpoint = "product-codbar";
    const section = "products"
    const label = "Producto";
    const product = await fetchDataOne(`product`,`Producto`, id!);

    // si product.variantId, sizetypeId, hasColor dan false. lanza un mensaje que diga "A este producto no se pueden agregar variantes. Habilite las variantes primero o ingrese el Codigo de Barras directamten en el producto." y que redireccione a "dashboard/products/product"
    
    if (!product.variantId && !product.sizetypeId && !product.hasColor) {
        
        redirect(`/dashboard/products/product`);
    }

    const valueVariant = product.variantId ? await fetchDataOne(`value-variant/variant`,`Valor de Variantes`, product.variantId) : [];
    const size = product.sizetypeId ? await fetchDataOne(`size/size-type`,`Talles`, product.sizetypeId) : [];
    const color = product.hasColor ? await fetchDataRelation("color", "Color") : [];
    
    const formCrud: FormCrud<ProductCodbar>[] = [
        {label: "Producto", elementForm: "select", key: "productId", data: [product], defaultValue: product.id, required:true}
    ]
    if (valueVariant.length > 0) 
        formCrud.push({label: "Variantes", elementForm: "select", key: "valueVariantId", data: valueVariant})
    if (size.length > 0)
        formCrud.push({label: "Talles", elementForm: "select", key: "sizeId", data: size})
    if (color.length > 0)
        formCrud.push({label: "Colores", elementForm: "select", key: "colorId", data: color})
    formCrud.push({label: "Codigo de Barras", elementForm: "text", key: "codbar", required: true})

    return createAdd ? (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
          <CreateForm endpoint={endpoint} section={section} label={label} varios={true} formCrud={formCrud}/>
        </div>
    ) : (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
        <CreateForm endpoint={endpoint} section={section} label={label} formCrud={formCrud}/>
      </div> 
    )
}

export default NewBrand;
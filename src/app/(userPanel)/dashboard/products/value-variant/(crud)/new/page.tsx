import { FormCrud, ValueVariant } from "@/types";
import {CreateForm} from "@/components/dashboard";
import { fetchDataRelation } from "@/fetchs/dashboard/crudFechServer";

interface Props {
    searchParams: Promise<{
        createAdd?: boolean
    }>
}

const NewBrand: React.FC<Props> = async ({searchParams}) => {

    const createAdd = (await searchParams).createAdd

    // Datos a modificar de cada page.
    const endpoint = "value-variant";
    const section ="products"
    const endpointRelatin = "variant";
    const label = "Valor de Variantes";
    const dataRelation = await fetchDataRelation(endpointRelatin, label);
    const formCrud: FormCrud<ValueVariant>[] = [
        {label: "Nombre", elementForm: "text", key: "name"},
        {label: "Variante", elementForm: "select", key: "variantId", data: dataRelation}
    ]

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
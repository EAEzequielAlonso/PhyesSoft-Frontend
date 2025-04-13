import { FormCrud, PaymentMethod } from "@/types";
import {CreateForm} from "@/components";

interface Props {
    searchParams: Promise<{
        createAdd?: boolean
    }>
}

const NewBrand: React.FC<Props> = async ({searchParams}) => {

    const createAdd = (await searchParams).createAdd

    // Datos a modificar de cada page.
    const endpoint = "payment-method";
    const section= "sales";
    const label = "Metodos de Pago";
    const formCrud: FormCrud<PaymentMethod>[] = [
        {label: "Nombre", elementForm: "text", key: "name"},
        {label: "Ajuste", elementForm: "number", key: "adjustment"}
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
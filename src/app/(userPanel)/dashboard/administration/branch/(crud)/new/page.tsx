import { Branch, FormCrud } from "@/types";
import {CreateForm} from "@/components/dashboard";

interface Props {
    searchParams: Promise<{
        createAdd?: boolean
    }>
}

const NewBrand: React.FC<Props> = async ({searchParams}) => {

    const createAdd = (await searchParams).createAdd

    // Datos a modificar de cada page.
    const endpoint = "branch";
    const section = "administration";
    const label = "Sucursal";
    const formCrud: FormCrud<Branch>[] = [
        {label: "Nombre", elementForm: "text", key: "name"},
        {label: "Dirección", elementForm: "text", key: "address"},
        {label: "Ciudad", elementForm: "text", key: "city"},
        {label: "Email de Sucursal", elementForm: "email", key: "emailBranch"},
        {label: "Inicio de Actividad", elementForm: "date", key: "initDate"},
        {label: "Es La Central", elementForm: "checkbox", key: "central"},
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
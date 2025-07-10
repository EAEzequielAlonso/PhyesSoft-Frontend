import {CreateForm} from "@/components/dashboard";
import { Bonus, FormCrud } from "@/types";
import { fetchDataOne } from "@/fetchs/dashboard/crudFechServer";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function EditBrandPage ({params}: Props) {
    const id = (await params).id

    // Datos a modificar de cada page.
        const endpoint = "bonus";
        const section = "employee";
        const label = "Premio de Empleados";
    
        const formCrud: FormCrud<Bonus>[] = [
            {label: "Nombre", elementForm: "text", key: "name", required: true },
            {label: "Valor", elementForm: "number", key: "value", required: true},
            {label: "¿Esta Activo?", elementForm: "checkbox", key: "isActive"},
        ]

    const data = await fetchDataOne(endpoint, label, id)

    return (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
            <CreateForm endpoint={endpoint} section={section} label={label} item={data} formCrud={formCrud}/>
        </div> 
    )
    
}
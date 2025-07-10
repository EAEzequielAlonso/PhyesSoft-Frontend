import {CreateForm} from "@/components/dashboard";
import { EmployeeRole, FormCrud } from "@/types";
import { fetchDataOne } from "@/fetchs/dashboard/crudFechServer";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function EditBrandPage ({params}: Props) {
    const brandId = (await params).id

    const endpoint = "employee-role";
        const section = "employee";
        const label = "Rol de Empleados";
        const formCrud: FormCrud<EmployeeRole>[] = [
            {label: "Nombre", elementForm: "text", key: "name"},
            {label: "Salario Base", elementForm: "number", key: "baseSalary"},
            {label: "Comisión", elementForm: "number", key: "commission"},
        ]

    const data = await fetchDataOne(endpoint, label, brandId)

    return (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
            <CreateForm endpoint={endpoint} section={section} label={label} item={data} formCrud={formCrud}/>
        </div> 
    )
    
}
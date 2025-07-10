import {CreateForm} from "@/components/dashboard";
import { Employee, FormCrud } from "@/types";
import { fetchDataOne, fetchDataRelation } from "@/fetchs/dashboard/crudFechServer";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function EditBrandPage ({params}: Props) {
    const id = (await params).id

    // Datos a modificar de cada page.
    const endpoint = "employees";
    const section = "employee";
    const label = "Empleado";
    const [roles] = await Promise.all ([
        fetchDataRelation("employee-role", "Rol de Empleados"),
    ]) 

    const formCrud: FormCrud<Employee>[] = [
        {label: "Nombre", elementForm: "text", key: "name", required: true},
        {label: "DNI", elementForm: "number", key: "dni"},
        {label: "CUIT", elementForm: "number", key: "cuit"},
        {label: "Email", elementForm: "email", key: "email"},
        {label: "Telefono", elementForm: "text", key: "phone"},
        {label: "Dirección", elementForm: "text", key: "address"},
        {label: "Salario Base", elementForm: "number", key: "baseSalary"},
        {label: "Comisión", elementForm: "number", key: "commission"},
        {label: "Es Vendedor", elementForm: "checkbox", key: "isSaler"},
        {label: "¿Activo?", elementForm: "checkbox", key: "isActive"},
        {label: "Rol del Empleado", elementForm: "select", key: "roleId", data: roles}

    ]

    const data = await fetchDataOne(endpoint, label, id)

    return (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
            <CreateForm endpoint={endpoint} section={section} label={label} item={data} formCrud={formCrud}/>
        </div> 
    )
    
}
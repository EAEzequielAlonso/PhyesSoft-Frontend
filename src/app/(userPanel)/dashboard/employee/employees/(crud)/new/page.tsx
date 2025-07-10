import { Employee, FormCrud } from "@/types";
import {CreateForm} from "@/components";
import { fetchDataRelation } from "@/fetchs/dashboard/crudFechServer";

interface Props {
    searchParams: Promise<{
        createAdd?: boolean;
    }>
}

const NewBrand: React.FC<Props> = async ({searchParams}) => {

    const {createAdd} = await searchParams

    // Datos a modificar de cada page.
    const endpoint = "employees";
    const section = "employee";
    const label = "Empleado";
    const [roles] = await Promise.all ([
        fetchDataRelation("employee-role", "Rol de Empleados"),
    ]) 

    const formCrud: FormCrud<Employee>[] = [
        {label: "Nombre", elementForm: "text", key: "name", required: true },
        {label: "DNI", elementForm: "number", key: "dni"},
        {label: "CUIT", elementForm: "number", key: "cuit"},
        {label: "Email", elementForm: "email", key: "email"},
        {label: "Telefono", elementForm: "text", key: "phone"},
        {label: "Dirección", elementForm: "text", key: "address"},
        {label: "Salario Base", elementForm: "number", key: "baseSalary", defaultValue: 0},
        {label: "Comisión", elementForm: "number", key: "commission", defaultValue: 0},
        {label: "Es Vendedor", elementForm: "checkbox", key: "isSaler", defaultValue: false},
        {label: "¿Activo?", elementForm: "checkbox", key: "isActive", defaultValue: true},
        {label: "Rol del Empleado", elementForm: "select", key: "roleId", data: roles}

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
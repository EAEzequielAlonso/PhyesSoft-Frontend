import { FormCrud, SalaryAdvance } from "@/types";
import {CreateForm} from "@/components";
import { fetchDataRelation } from "@/fetchs/dashboard/crudFechServer";

interface Props {
    searchParams: Promise<{
        createAdd?: boolean;
        id: string;
    }>
}

const NewBrand: React.FC<Props> = async ({searchParams}) => {

    const {createAdd, id= ""} = await searchParams

    // Datos a modificar de cada page.
    const endpoint = "salary-advance";
    const section = "employee";
    const label = "Adelanto de sueldo";
    const [employee, dailyCash, movementType] = await Promise.all ([
        fetchDataRelation("employees", "Empleado"),
        fetchDataRelation("daily-cash", "Caja Diaria"),
        fetchDataRelation("movement-type", "Tipo de Movimiento"),
    ]) 

    const formCrud: FormCrud<SalaryAdvance>[] = [
        {label: "Monto", elementForm: "number", key: "amount", required: true },
        {label: "Razón", elementForm: "text", key: "reason" },
        {label: "Empleado", elementForm: "select", key: "employeeId", data: employee, defaultValue: id},
        {label: "Se Paga de la Caja:", elementForm: "select", key: "dailyCashId", data: dailyCash, placeholder: "No se Abona de Caja", atributeDisplay: ["boxCash.branch.name", "boxCash.name"]},
        {label: "Elija el movimiento solo si sale de una caja", elementForm: "select", key: "movementTypeId", data: movementType, placeholder: "No se Abona de Caja"},
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
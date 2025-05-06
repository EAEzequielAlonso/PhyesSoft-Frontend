import { BoxCash, FormCrud } from "@/types";
import {CreateForm} from "@/components";
import { fetchDataRelation } from "@/fetchs/dashboard/crudFechServer";

interface Props {
    searchParams: Promise<{
        createAdd?: boolean
    }>
}

const NewSalePoint: React.FC<Props> = async ({searchParams}) => {

    const createAdd = (await searchParams).createAdd

    // Datos a modificar de cada page.
    const endpoint = "box-cash";
    const section = "administration";
    const label = "Caja"; 
    const [branch, salePoint] = await Promise.all ([
        fetchDataRelation("branch", "Sucursal"),
        fetchDataRelation("sale-point", "Punto de Venta"),
    ])

    const formCrud: FormCrud<BoxCash>[] = [
        {label: "Nombre", elementForm: "text", key: "name"},
        {label: "Sucursal", elementForm: "select", key: "branchId", data: branch},
        {label: "Punto de Venta", elementForm: "select", key: "salePointId", data: salePoint},
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

export default NewSalePoint;
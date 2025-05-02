import { FiscalData, FormCrud } from "@/types";
import {CreateForm} from "@/components";
import { fetchData } from "@/fetchs/dashboard/crudFechServer";

interface Props {
    searchParams: Promise<{
        createAdd?: boolean
    }>
}

const NewBrand: React.FC<Props> = async ({searchParams}) => {

    const createAdd = (await searchParams).createAdd

    // Datos a modificar de cada page.
    const endpoint = "fiscal-data";
    const section = "administration";
    const label = "Dato Fiscal";
    const [conditionIva, ticketType] = await Promise.all ([
        fetchData("fiscal-data/conditioniva", "Condicion IVA", ""),
        fetchData("fiscal-data/tickettype", "Tipo de Facturación", ""),
    ]) 

    const formCrud: FormCrud<FiscalData>[] = [
        {label: "Razon Social", elementForm: "text", key: "name"},
        {label: "CUIT", elementForm: "number", key: "cuit"},
        {label: "Dirección Comercial", elementForm: "text", key: "addressCommerce"},
        {label: "Inicio de Actividad", elementForm: "date", key: "initActivity"},
        {label: "Ingresos Brutos", elementForm: "text", key: "ingresosBrutos"},
        {label: "Alias de Facturación", elementForm: "text", key: "aliasFacturacion"},
        {label: "Condicion IVA", elementForm: "select", key: "conditionIva", data: conditionIva},
        {label: "Tipo de Factura", elementForm: "select", key: "ticketType", data: ticketType}

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
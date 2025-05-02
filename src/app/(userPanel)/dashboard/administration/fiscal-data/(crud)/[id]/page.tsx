import {CreateForm} from "@/components/dashboard";
import { FiscalData, FormCrud } from "@/types";
import { fetchData, fetchDataOne } from "@/fetchs/dashboard/crudFechServer";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function EditBrandPage ({params}: Props) {
    const id = (await params).id

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

    const data = await fetchDataOne(endpoint, label, id)

    return (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
            <CreateForm endpoint={endpoint} section={section} label={label} item={data} formCrud={formCrud}/>
        </div> 
    )
    
}
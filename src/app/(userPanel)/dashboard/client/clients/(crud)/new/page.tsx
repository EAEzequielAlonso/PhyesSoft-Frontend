import { Client, FormCrud } from "@/types";
import {CreateForm} from "@/components/dashboard";

interface Props {
    searchParams: Promise<{
        createAdd?: boolean
    }>
}

const NewBrand: React.FC<Props> = async ({searchParams}) => {

    const createAdd = (await searchParams).createAdd

    // Datos a modificar de cada page.
    const endpoint = "clients";
    const section = "client"
    const label = "Cliente";
    
    const formCrud: FormCrud<Client>[] = [
        {label: "Cliente", elementForm: "text", key: "client", required:true},
        {label: "Nombre", elementForm: "text", key: "name", required:true},
        {label: "Celular", elementForm: "text", key: "movil"},
        {label: "Telefono", elementForm: "text", key: "phone"},

        {label: "Email", elementForm: "email", key: "email"},
        {label: "Direccion", elementForm: "text", key: "address"},
        {label: "Provincia", elementForm: "text", key: "state"},
        {label: "Ciudad", elementForm: "text", key: "city"},
        {label: "Cod. Pos.", elementForm: "text", key: "zip"},

        {label: "Descuento en Compras", elementForm: "number", key: "discount", defaultValue: 0 },
        {label: "CUIT", elementForm: "text", key: "cuit"},
        {label: "DNI", elementForm: "text", key: "dni"},
        {label: "Ticket Por Defecto", elementForm: "text", key: "ticketType"},
        {label: "Razon Social", elementForm: "text", key: "razonSocial"},
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
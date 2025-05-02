import {CreateForm} from "@/components/dashboard";
import { Commerce, FormCrud } from "@/types";
import { fetchData } from "@/fetchs/dashboard/crudFechServer";

export default async function EditBrandPage () {

    // Datos a modificar en cada page
    const endpoint = "commerce";
    const section = "administration";
    const label = "Comercio"
    const formCrud: FormCrud<Commerce>[] = [
        {label: "Nombre de la Empresa", elementForm: "text", key: "nameCompany"},
        {label: "Nombre de Fantasia", elementForm: "text", key: "nameFantasy"},
        {label: "Email de la Empresa", elementForm: "text", key: "emailCompany"},
        {label: "Eslogan", elementForm: "text", key: "slogan"},
        {label: "Link del logo empresarial", elementForm: "text", key: "imgLogo"},
        {label: "Inicio de Actividades", elementForm: "date", key: "InitDate"},
    ]

    const data = await fetchData(endpoint, label, "")

    return (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
            <CreateForm endpoint={endpoint} section={section} label={label} item={data} formCrud={formCrud}/>
        </div> 
    )
    
}
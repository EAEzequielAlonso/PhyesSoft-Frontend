import { cookies } from "next/headers";
import {CreateForm} from "@/components";
import { redirect } from "next/navigation";
import { Brand, FormCrud } from "@/types";

const getBrand = async (endpoint: string, label: string, brandId: string) => {
  try {
    const token = (await cookies()).get("token");
    if (!token) redirect("/login");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${brandId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
    });
    const resp = await response.json();
    return resp;
  } catch (error) {
    throw new Error(`Error al cargar los datos en ${label}. Error: ${error}`);
  }
};

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function EditBrandPage ({params}: Props) {
    const brandId = (await params).id
    const brand:Brand = await getBrand("brand", "Marca", brandId)
    const formCrud: FormCrud<Brand>[] = [
            {label: "Nombre", elementForm: "text", key: "name"}
        ]
    return (
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-xl border border-gray-300 m-auto mt-8">
            <CreateForm endpoint="brand" label="Marcas" item={brand} formCrud={formCrud}/>
        </div> 
    )
    
}
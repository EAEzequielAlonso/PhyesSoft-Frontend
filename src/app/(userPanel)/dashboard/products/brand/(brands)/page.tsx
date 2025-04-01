import { redirect } from "next/navigation";
import Pagination from "./pagination";
import Table from "./table";
import { cookies } from "next/headers";
import { Brand } from "@/types";
import { Suspense } from "react";

const fetchData = async (endpoint: string, label: string, search: string) => {
  try {
    const token = (await cookies()).get("token");
    if (!token) redirect("/login");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}?${search}`, {
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

interface BrandPageProps {
  searchParams: Promise <{ 
    search?: string;
    page?:string;
  }>;
}

export default async function BrandPage({ searchParams }: BrandPageProps) {
 const {search = "", page = "1"} = await searchParams;

  const brand = {
    columns: [{ key: "name", label: "Nombre" }],
    initialData: [],
    route: "brand",
    label: "Marcas",
  };

  const brandData = await fetchData(brand.route, brand.label, `search=${search}&page=${page}`);
  const data: Brand[] = brandData[0];
  const limit = 10;
  const totalPages = Math.ceil(brandData[1] / limit);

  return (
    <>
      <div className="flex justify-center items-center">
            <Table data={data} />
      </div>
      <Suspense fallback={<p>Cargando Paginación...</p>}>
        <Pagination page={+page} totalPages={totalPages ? totalPages : 1} />
      </Suspense>
    </>
  );
}

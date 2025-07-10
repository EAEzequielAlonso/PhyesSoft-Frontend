import {Pagination, Table} from "@/components/dashboard";
import { fetchData } from "@/fetchs/dashboard/crudFechServer";
import { ButtonAction, Product } from "@/types";
import { Suspense } from "react";
import { Columns } from "@/types";
import { FaBarcode } from "react-icons/fa";

interface ListPageProps {
  searchParams: Promise <{ 
    search?: string;
    page?:string;
  }>;
}

export default async function ListPage({ searchParams }: ListPageProps) {
  
  const {search = "", page = "1"} = await searchParams;

  // datos Particulares de cada uno
  const columns:Columns<Product>[] = [
    {key:"name", label:"Nombre", type: "text"}, 
    {key:"cost", label:"Costo", type: "price"},
    {key:"price", label:"Precio", type: "price"}
  ]
  const endpoint = "product";
  const section = "products"
  const label = "Producto"

  const actions:ButtonAction<Product>[] = [
      { href:`/dashboard/${section}/product-codbar`, nameParam: "id", color: "blue", icon: <FaBarcode />, type:'product', title: "Agregar Codigo de Barras"}
    ]

  const datafromfetch = await fetchData(endpoint, label, `search=${search}&page=${page}`);
  const data = datafromfetch[0];
  const limit = 10;
  const totalPages = Math.ceil(datafromfetch[1] / limit);

  return (
    <>
      <div className="flex justify-center items-center">
            <Table<Product> data={data} endpoint={endpoint} section={section} label={label} columns={columns} actions={actions}/>
      </div>
      <Suspense fallback={<p>Cargando Paginación...</p>}>
        <Pagination page={+page} totalPages={totalPages ? totalPages : 1} endpoint={endpoint} />
      </Suspense>
    </>
  );
}

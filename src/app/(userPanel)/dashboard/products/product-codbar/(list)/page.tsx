import {Pagination, Table} from "@/components/dashboard";
import { fetchData, fetchDataOne } from "@/fetchs/dashboard/crudFechServer";
import { Product, ProductCodbar } from "@/types";
import { Suspense } from "react";
import { Columns } from "@/types";

interface ListPageProps {
  searchParams: Promise <{ 
    id?: string;
    search?: string;
    page?:string;
  }>;
}

export default async function ListPage({ searchParams }: ListPageProps) {
  
  const {search = "", page = "1", id} = await searchParams;

  // datos Particulares de cada uno
  const endpoint = "product-codbar";
  const section = "products"
  const label = "Producto"
  const columns:Columns<ProductCodbar>[] = []
  const product: Product = await fetchDataOne('product', label, id!)
    if (product.hasColor) {
      console.log("estoy en color .")
      columns.push({key:"color", label:"Color", type: "object"})
    }
    if (product.sizetypeId) {
      console.log("estoy en size .")
      columns.push({key:"size", label:"Talle", type: "object"})
    }
    if (product.variantId) {
      console.log("no deberia estar aca adentro.")
      columns.push({key:"valueVariant", label:"Variante", type: "object"})
    }
  columns.push({key:"codbar", label:"Codigo de Barras", type: "text"})

  const datafromfetch = await fetchData(endpoint, label, `productId=${id}&search=${search}&page=${page}`);
  const data = datafromfetch[0];
  const limit = 10;
  const totalPages = Math.ceil(datafromfetch[1] / limit);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h2>{product.name && product.name}</h2>
        <Table<ProductCodbar> data={data} endpoint={endpoint} section={section} label={label} columns={columns} />
      </div>
      <Suspense fallback={<p>Cargando Paginación...</p>}>
        <Pagination page={+page} totalPages={totalPages ? totalPages : 1} endpoint={endpoint} />
      </Suspense>
    </>
  );
}

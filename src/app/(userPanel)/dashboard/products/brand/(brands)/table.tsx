import { Brand } from "@/types"
import { LuPencil, LuTrash } from "react-icons/lu";
import ButtonDelete from "./buttonDelete"
import Link from "next/link";

const columns = [
    {key:"name", label:"Nombre"}
]

interface Props  {
    data: Brand[]
}
  
export default async function Table ({data}: Props) {

  const isValidArray = Array.isArray(data) && data.length > 0;

    return isValidArray ? (
          <table className="table">
            <thead>
              <tr>
                {columns.map((column) => 
                    <th key={column.key}>{column.label}</th>
                )}
                <th>Acciones</th>
                {/* <th
                  onClick={() => {
                    setSortField("name");
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}>
                  Nombre
                  {sortField === "name" && <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>}
                </th> */}
              </tr>
            </thead>
             <tbody>
              {data.map((dat) => (
                <tr
                  key={dat.id}
                >
                  <td>{dat.name}</td>
                  <td className="text-center">
                  <Link href={`/dashboard/brand/${dat.id}`}>
                     <button className="btn-text-green mx-2 my-1"><LuPencil /></button>
                  </Link>  
                  <ButtonDelete brandId={dat.id} endpoint="brand" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table> )
        : (
        <div className="flex justify-center h-36 items-center">
             <h1 className="text-4xl text-gray-300 font-bold">No se pueden mostrar las Marcas</h1>
        </div>)
  }
  
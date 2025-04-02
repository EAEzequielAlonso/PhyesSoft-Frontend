
import { LuPencil } from "react-icons/lu";
import {ButtonDelete} from "@/components"
import Link from "next/link";
import { Columns } from "@/types";

interface Props<T>  {
    data: T[],
    endpoint:string,
    label:string
    columns: Columns<T>[]
}
  
export function Table<T extends {id:string}> ({data, endpoint, label, columns}: Props<T>) {

  const isValidArray = Array.isArray(data) && data.length > 0;

    return isValidArray ? (
          <table className="table">
            <thead>
              <tr>
                {columns.map((column) => 
                    <th key={column.key.toString()}>{column.label}</th>
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
                  {columns.map((col) => (
                    <td key={dat.id+col.key.toString()}>
                      {dat[col.key as keyof T] as React.ReactNode}
                    </td>
                  ))}

                  <td className="text-center">
                  <Link href={`/dashboard/products/${endpoint}/${dat.id}`}>
                     <button className="btn-text-green mx-2 my-1"><LuPencil /></button>
                  </Link>  
                  <ButtonDelete id={dat.id} endpoint={endpoint} label={label} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table> )
        : (
        <div className="flex justify-center h-36 items-center">
             <h1 className="text-4xl text-gray-300 font-bold">No se pueden mostrar los datos</h1>
        </div>)
  }
  
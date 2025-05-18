
import { LuPencil } from "react-icons/lu";
import {ButtonDelete} from "."
import Link from "next/link";
import { Columns } from "@/types";

interface Props<T>  {
    data: T[],
    endpoint:string,
    section: string,
    label:string,
    columns: Columns<T>[],
    canEdit?: boolean,
}
  
export function Table<T extends {id:string}> ({data, endpoint, section, label, columns, canEdit = true}: Props<T>) {

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
                  {columns.map((col) => {
                      const rawValue = dat[col.key as keyof T];

                      let cellContent: React.ReactNode;

                      if (typeof rawValue === "object" && rawValue !== null) {
                        // Si es un objeto, tratamos de obtener .name
                        cellContent = (rawValue as { name?: string }).name ?? "";
                      } else if (typeof rawValue === "number") {
                        // Si es un número, formateamos como moneda
                        cellContent = new Intl.NumberFormat("es-AR", {
                          style: "currency",
                          currency: "ARS",
                          minimumFractionDigits: 2,
                        }).format(rawValue);
                      } else {
                        // Si no, lo dejamos como está
                        cellContent = rawValue as React.ReactNode;
                      }

                      return <td key={dat.id + col.key.toString()}>{cellContent}</td>;
                    })}

                  <td className="text-center">
                  {canEdit &&
                  <Link href={`/dashboard/${section}/${endpoint}/${dat.id}`}>
                     <button className="btn-text-green mx-2 my-1"><LuPencil /></button>
                  </Link>  
                  }
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
  
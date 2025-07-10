
import { LuPencil } from "react-icons/lu";
import {ButtonDelete} from "."
import Link from "next/link";
import { ButtonAction, Columns } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatLocalDate } from "@/utils/formatLocalDate";

interface Props<T>  {
    data: T[],
    endpoint:string,
    section: string,
    label:string, 
    columns: Columns<T>[],
    canEdit?: boolean,
    canDelete?: boolean,
    actions?: ButtonAction<T>[],
}
  
export function Table<T extends {id:string}> ({data, endpoint, section, label, columns, canEdit = true, canDelete = true, actions}: Props<T>) {

  const isValidArray = Array.isArray(data) && data.length > 0;

    return isValidArray ? (
          <table className="table">
            <thead>
              <tr>
                {columns.map((column) => 
                    <th key={column.key.toString()} className="text-center">{column.label}</th>
                )}
                <th className="text-center">Acciones</th>
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

                      if (col.type === "object") {
                        // Si es un objeto, tratamos de obtener .name
                        cellContent = (rawValue as { name?: string }).name ?? "";
                      } else if (col.type === "boolean") {
                        // Si no, lo dejamos como está
                        cellContent = rawValue ? "Si" as React.ReactNode : "No" as React.ReactNode ;
                      } else if (col.type === "price") {
                        // Si es un número, formateamos como moneda
                        cellContent = formatCurrency("$", Number(rawValue)) as React.ReactNode;
                      } else if (col.type === "porcent") {
                        cellContent = formatCurrency("%", Number(rawValue)) as React.ReactNode;
                      } else if (col.type === "date") {
                        // Es un string que se puede parsear como fecha
                        
                        const localDate = formatLocalDate(String(rawValue));
                        cellContent = localDate;
                      } else if (col.type === "text") {
                        cellContent = rawValue as React.ReactNode;
                      } 

                      return <td key={dat.id + col.key.toString()} className="text-center">{cellContent}</td>;
                    })}

                  <td className="text-center">
                    {actions?.map((item, index) => {
                      // 👇 Aquí va tu chequeo de tipo + condición:
                      if (item.type === 'product') {
                        const isProductWithColor = 'hasColor' in dat && dat.hasColor;
                        const isProductWithVariant = 'variantId' in dat && dat.variantId !== null && dat.variantId !== '';
                        const isProductWithSizeType = 'sizetypeId' in dat && dat.sizetypeId != null && dat.sizetypeId !== '';

                        // Por ejemplo: solo mostrar el botón si la acción es para Product y tiene color
                        if (!isProductWithColor && !isProductWithVariant && !isProductWithSizeType) {
                          return null; // No renderiza nada para esta acción
                        }
                      }

                      return (
                        <Link
                          key={index}
                          href={`${item.href}${item.nameParam ? `?${item.nameParam as string}=${dat.id}` : ''}`}
                        >
                          <button
                            className={`btn-text-${item.color} mx-2 my-1`}
                            title={item.title}
                          >
                            {item.icon}
                          </button>
                        </Link>
                      );
                    })}
                  {canEdit &&
                  <Link href={`/dashboard/${section}/${endpoint}/${dat.id}`}>
                     <button className="btn-text-green mx-2 my-1" title = "Editar"><LuPencil /></button>
                  </Link>  
                  }
                  {canDelete &&
                    <ButtonDelete id={dat.id} endpoint={endpoint} label={label} />
                  }
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
  
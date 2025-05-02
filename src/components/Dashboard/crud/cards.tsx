import { LuPencil } from "react-icons/lu";
import { ButtonDelete } from ".";
import Link from "next/link";
import { Columns } from "@/types";

interface Props<T> {
  data: T[];
  endpoint: string;
  section: string;
  label: string;
  columns: Columns<T>[];
}

export function Cards<T extends { id: string }>({
  data,
  endpoint,
  section,
  label,
  columns,
}: Props<T>) {
  const isValidArray = Array.isArray(data) && data.length > 0;

  if (!isValidArray) {
    return (
      <div className="flex justify-center h-36 items-center">
        <h1 className="text-4xl text-gray-300 font-bold">No se pueden mostrar los datos</h1>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white shadow-md rounded-xl p-4 border border-gray-100"
        >
          <div className="space-y-2 mb-4">
            {columns.map((col) => {
              const rawValue = item[col.key as keyof T];
              let displayValue: React.ReactNode;

              if (typeof rawValue === "object" && rawValue !== null) {
                displayValue = (rawValue as { name?: string }).name ?? "";
              } else if (typeof rawValue === "number") {
                displayValue = new Intl.NumberFormat("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                }).format(rawValue);
              } else {
                displayValue = rawValue as React.ReactNode;
              }

              return (
                <div key={item.id + col.key.toString()} className="text-sm text-gray-700">
                  <span className="font-semibold">{col.label}:</span>{" "}
                  <span className="text-gray-600">{displayValue}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end space-x-2">
            <Link href={`/dashboard/${section}/${endpoint}/${item.id}`}>
              <button className="btn-text-green"><LuPencil /></button>
            </Link>
            <ButtonDelete id={item.id} endpoint={endpoint} label={label} />
          </div>
        </div>
      ))}
    </div>
  );
}

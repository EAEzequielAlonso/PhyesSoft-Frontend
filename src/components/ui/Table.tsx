// Table.tsx
"use client"
import React from 'react';

type Column<T> = { key: keyof T; label: string };
interface TableProps<T> { columns: Column<T>[]; data: T[]; }

export function Table<T extends { id: string | number }>({ columns, data }: TableProps<T>) {
  return (
    <table className="w-full rounded-lg text-sm">
      <thead className="bg-blue-600 text-white">
        <tr>{columns.map(col => <th key={String(col.key)} className="p-2">{col.label}</th>)}</tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id} className="border-b hover:bg-gray-50">
            {columns.map(col => <td key={String(col.key)} className="p-2 text-center">{String(row[col.key])}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
"use client";

import { LuSearch } from "react-icons/lu";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";

export function Filter({endpoint}:{endpoint:string}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    // Cada vez que cambie el search param, actualizamos el estado
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Actualizamos la URL sin recargar el layout
    router.push(`/dashboard/${endpoint}?search=${encodeURIComponent(search)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="container-search">
      <input
          type="text"
          name="search"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      <button type="submit" className="btn-icon-orange">
        <LuSearch />
      </button>
    </form>
  );
}

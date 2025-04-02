"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  page: number;
  totalPages: number;
  endpoint:string
}

export const Pagination: React.FC<Props> = ({ page, totalPages, endpoint }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const handlePageChange = (newPage: number) => {
    router.push(`/dashboard/products/${endpoint}?search=${encodeURIComponent(search)}&page=${newPage}`);
  };

  return (
    <div className="container-pagination">
      <button
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Anterior
      </button>
      <h2>{page} de {totalPages}</h2>
      <button
        disabled={+page === +totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Siguiente
      </button>
    </div>
  );
};

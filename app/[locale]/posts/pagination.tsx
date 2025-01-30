"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Исправление 3: Безопасное создание URLSearchParams
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="mt-4 flex justify-center space-x-2">
      {currentPage > 1 && (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded border px-4 py-2"
        >
          Предыдущая
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={createPageURL(page)}
          className={`rounded border px-4 py-2 ${
            currentPage === page ? "bg-blue-500 text-white" : ""
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded border px-4 py-2"
        >
          Следующая
        </Link>
      )}
    </div>
  );
}

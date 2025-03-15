"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  prevLabel: string;
  nextLabel: string;
};

export function Pagination({
  currentPage,
  totalPages,
  prevLabel,
  nextLabel,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav className="mt-24 mb-14 flex justify-center space-x-2">
      {currentPage > 1 && (
        <Button asChild variant="outline" size="lg">
          <Link href={createPageURL(currentPage - 1)}>{prevLabel}</Link>
        </Button>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) =>
        currentPage === page ? (
          <Button size="lg" key={page} variant="destructive" disabled>
            {page}
          </Button>
        ) : (
          <Button asChild size="lg" key={page} variant="outline">
            <Link href={createPageURL(page)}>{page}</Link>
          </Button>
        ),
      )}

      {currentPage < totalPages && (
        <Button asChild variant="outline" size="lg">
          <Link href={createPageURL(currentPage + 1)}>{nextLabel}</Link>
        </Button>
      )}
    </nav>
  );
}

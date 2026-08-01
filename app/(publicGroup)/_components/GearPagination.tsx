"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type GearPaginationProps = {
  currentPage: number;
  totalPage: number;
};

export function GearPagination({
  currentPage,
  totalPage,
}: GearPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function changePage(page: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());

    router.push(`${pathname}?${params.toString()}`);
  }

  if (totalPage <= 1) {
    return null;
  }

  const pages = Array.from(
    { length: totalPage },
    (_, index) => index + 1,
  );

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            onClick={(event) => {
              event.preventDefault();

              if (currentPage > 1) {
                changePage(currentPage - 1);
              }
            }}
          />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={(event) => {
                event.preventDefault();
                changePage(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={currentPage === totalPage}
            className={
              currentPage === totalPage
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            onClick={(event) => {
              event.preventDefault();

              if (currentPage < totalPage) {
                changePage(currentPage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"

interface PaginationDataProps {
  totalPages: number;
  currentPage: number;
}

function PaginationData({ totalPages, currentPage }: PaginationDataProps) {

   // If there is only one page, don't render the pagination
    if (totalPages <= 1) {
      return null;
    }

  return (
    <Pagination>
      <PaginationContent className="mt-[30px] gap-1 sm:gap-2">
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            className="text-[14px] pr-[10px] sm:pr-[16px] sm:text-[24px] [&>svg]:!h-4 [&>svg]:!w-4 sm:[&>svg]:!h-8 sm:[&>svg]:!w-8"
            href={`?page=${currentPage > 1 ? currentPage - 1 : 1}`}
          />
        </PaginationItem>

        {/* First Page */}
        <PaginationItem>
          <PaginationLink
            className="w-[28px] h-[28px] sm:w-[40px] sm:h-[40px] text-[14px] sm:text-[24px]"
            href={`?page=1`}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {/* Ellipsis if not adjacent to first page */}
        {currentPage > 2 && (
          <PaginationItem className="flex justify-center w-[28px] h-[28px] sm:w-[40px] sm:h-[40px]">
            <PaginationEllipsis className="text-center" />
          </PaginationItem>
        )}

        {/* Current Page if not first or last */}
        {currentPage > 1 && currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink
              className="w-[28px] h-[28px] sm:w-[40px] sm:h-[40px] text-[14px] sm:text-[24px]"
              href={`?page=${currentPage}`}
              isActive
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Ellipsis if not adjacent to last page */}
        {currentPage < totalPages - 1 && (
          <PaginationItem className="flex justify-center w-[28px] h-[28px] sm:w-[40px] sm:h-[40px]">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last Page (if different from first) */}
        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              className="w-[28px] h-[28px] sm:w-[40px] sm:h-[40px] text-[14px] sm:text-[24px]"
              href={`?page=${totalPages}`}
              isActive={currentPage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            className="text-[14px] sm:text-[24px] pl-[10px] sm:pl-[16px] [&>svg]:!h-4 [&>svg]:!w-4 sm:[&>svg]:!h-8 sm:[&>svg]:!w-8"
            href={`?page=${currentPage < totalPages ? currentPage + 1 : totalPages}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationData
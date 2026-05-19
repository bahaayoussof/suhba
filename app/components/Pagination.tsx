import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "../lib/utils";
import type { PaginationProps as BasePaginationProps } from "../../types";

interface PaginationProps extends BasePaginationProps {
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPages();

  return (
    <div className={cn("w-full mt-auto pt-4 border-t border-[var(--slate-200)] flex items-center justify-center gap-2", className)} dir="ltr">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "w-9 h-9 flex items-center justify-center rounded-md transition-colors",
          currentPage === 1
            ? "bg-[#cbd5e1] text-white cursor-not-allowed"
            : "bg-white text-[var(--deep-teal-900)] border border-[var(--slate-200)] hover:bg-[var(--slate-50)]"
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((page, idx) => (
        typeof page === 'number' ? (
          <button
            key={idx}
            onClick={() => onPageChange(page)}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-md text-sm font-bold transition-colors border",
              currentPage === page
                ? "bg-[var(--deep-teal-900)] text-white border-[var(--deep-teal-900)] shadow-sm"
                : "bg-white text-[var(--deep-teal-900)] border-[var(--slate-200)] hover:bg-[var(--slate-50)]"
            )}
          >
            {page}
          </button>
        ) : (
          <div key={idx} className="w-9 h-9 flex items-center justify-center rounded-md text-sm font-bold bg-white text-[var(--deep-teal-900)] border border-[var(--slate-200)]">
            {page}
          </div>
        )
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "w-9 h-9 flex items-center justify-center rounded-md transition-colors",
          currentPage === totalPages
            ? "bg-[#cbd5e1] text-white cursor-not-allowed"
            : "bg-white text-[var(--deep-teal-900)] border border-[var(--slate-200)] hover:bg-[var(--slate-50)]"
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

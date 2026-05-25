import { useState, useEffect } from "react";
import { Globe2 } from "lucide-react";
import Pagination from "../../components/Pagination";
import { cn } from "../../lib/utils";
import type { WorldCardProps } from "../../../types";
import { useWorldsQuery } from "../../hooks/useQueries";
import { useItemsPerPage } from "../../hooks/useItemsPerPage";

import EmptyState from "../../components/EmptyState";
import WorldCard from "../../components/WorldCard";

export default function DashboardWorlds() {
  const { data: worlds, isLoading, isError } = useWorldsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = useItemsPerPage({ default: 12, sm: 6, lg: 9 });

  const paginatedWorlds = worlds
    ? worlds.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  const totalPages = worlds ? Math.ceil(worlds.length / itemsPerPage) : 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [itemsPerPage, totalPages, currentPage]);

  return (
    <div className="p-5 min-h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="text-right">
          <h1 className="text-4xl font-extrabold text-[var(--deep-teal-900)] mb-1">العوالم</h1>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[var(--slate-100)] flex flex-col h-[340px] animate-pulse overflow-hidden">
              <div className="h-40 w-full bg-[var(--slate-200)]" />
              <div className="p-5 flex flex-col flex-1">
                <div className="h-6 w-1/2 bg-[var(--slate-200)] rounded mb-3" />
                <div className="h-4 w-full bg-[var(--slate-200)] rounded mb-2" />
                <div className="h-4 w-2/3 bg-[var(--slate-200)] rounded mb-6" />
                <div className="mt-auto flex justify-between items-center">
                  <div className="h-5 w-16 bg-[var(--slate-200)] rounded" />
                  <div className="h-9 w-20 bg-[var(--slate-200)] rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[var(--slate-100)]">
          <Globe2 className="w-12 h-12 text-[var(--slate-300)] mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[var(--slate-700)]">خطأ في تحميل العوالم</h3>
        </div>
      ) : worlds && worlds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          {paginatedWorlds.map((world: WorldCardProps) => (
            <WorldCard key={world.id} {...world} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="لا توجد عوالم"
          description="لم نتمكن من العثور على أي عوالم في الوقت الحالي."
        />
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </div>
  );
}

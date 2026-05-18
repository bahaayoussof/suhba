import { useState, useEffect } from "react";
import { Globe2, Users as UsersIcon } from "lucide-react";
import Pagination from "../../components/Pagination";
import { cn } from "../../components/ui/utils";
import type { WorldCardProps } from "../../../types/types";
import { useWorldsQuery } from "../../hooks/useQueries";

import EmptyState from "../../components/EmptyState";

function WorldCard({ name, description, memberCount, coverImage }: WorldCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--slate-100)] hover:shadow-md transition-shadow group flex flex-col h-full">
      <div className="relative h-40 w-full bg-[var(--slate-100)] overflow-hidden">
        <img
          src={coverImage}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl text-[var(--slate-700)] shadow-sm">
          <Globe2 className="w-5 h-5" />
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-[var(--slate-900)] mb-2">
          {name}
        </h3>
        <p className="text-sm text-[var(--slate-500)] mb-6 line-clamp-2">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[var(--slate-500)] text-sm font-medium">
            <UsersIcon className="w-4 h-4" />
            <span dir="ltr">{memberCount.toLocaleString()}</span> عضو
          </div>
          <button className="px-4 py-2 bg-[var(--deep-teal-50)] text-[var(--deep-teal-700)] hover:bg-[var(--deep-teal-100)] rounded-lg text-sm font-bold transition-colors">
            استكشاف
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardWorlds() {
  const { data: worlds, isLoading, isError } = useWorldsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1280);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getItemsPerPage = () => {
    if (windowWidth < 1024) return 6; // sm to md
    if (windowWidth < 1280) return 9; // lg
    return 12; // xl and up
  };

  const itemsPerPage = getItemsPerPage();

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

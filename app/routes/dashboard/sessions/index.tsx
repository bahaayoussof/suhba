import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import MajlisCard from "../../../components/MajlisCard";
import Pagination from "../../../components/Pagination";
import EmptyState from "../../../components/EmptyState";
import { cn } from "../../../lib/utils";
import { useSessionsQuery } from "../../../hooks/useQueries";
import { useAppStore } from "../../../store/useAppStore";

export default function DashboardSessions() {
  const activeTab = useAppStore((state) => state.activeSessionTab);
  const setActiveTab = useAppStore((state) => state.setActiveSessionTab);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getItemsPerPage = () => {
    if (windowWidth === null) return 8; // Default fallback for SSR & initial client render
    if (windowWidth < 1024) return 3; // sm to md
    if (windowWidth < 1280) return 6; // lg
    return 8; // xl and up
  };

  const itemsPerPage = getItemsPerPage();

  const { data: sessions, isLoading, isError } = useSessionsQuery();

  const tabs = [
    { id: "all", label: "الكل" },
    { id: "current", label: "مباشر" },
    { id: "upcoming", label: "مجدول" },
    { id: "past", label: "السابق" },
  ];

  const filteredSessions = sessions
    ? activeTab === "all"
      ? sessions
      : sessions.filter((s) => s.status === activeTab)
    : [];

  const paginatedSessions = filteredSessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [itemsPerPage, totalPages, currentPage]);

  return (
    <div className="p-6 min-h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="text-right">
          <h1 className="text-4xl font-extrabold text-[var(--deep-teal-900)] mb-2">
            مجالسي
          </h1>
          <p className="text-[#8eacac] text-sm font-medium">
            إدارة جلساتك النشطة وورش العمل المجدولة.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3">
          <Link
            to="/dashboard/sessions/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--deep-teal-800)] text-white rounded-xl shadow-sm hover:bg-[var(--deep-teal-900)] transition-colors w-full md:w-auto justify-center"
          >
            <Plus className="w-5 h-5" />
            إضافة مجلس جديد
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-start gap-2 bg-[var(--slate-50)] p-1.5 rounded-2xl border border-[var(--slate-100)] mb-8 self-start overflow-x-auto max-w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 whitespace-nowrap",
              activeTab === tab.id
                ? "bg-[var(--deep-teal-800)] text-white shadow-sm"
                : "text-[var(--slate-500)] hover:text-[var(--slate-800)] hover:bg-[var(--slate-100)]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl border border-[var(--slate-100)] p-6 flex flex-col h-[320px] animate-pulse">
               <div className="h-6 w-24 bg-[var(--slate-200)] rounded-lg mb-5" />
               <div className="h-6 w-3/4 bg-[var(--slate-200)] rounded  mb-4" />
               <div className="h-4 w-full bg-[var(--slate-200)] rounded mb-2" />
               <div className="h-4 w-2/3 bg-[var(--slate-200)] rounded  mb-6" />
               <div className="h-5 w-16 bg-[var(--slate-200)] rounded mb-6 mt-auto" />
               <div className="flex gap-3 border-t border-[var(--slate-50)] pt-5">
                 <div className="h-12 flex-1 bg-[var(--slate-200)] rounded-[14px]" />
                 <div className="h-12 w-12 bg-[var(--slate-200)] rounded-[14px]" />
               </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <EmptyState
          title="خطأ في تحميل البيانات"
          description="تعذر جلب المجالس من الخادم. يرجى المحاولة لاحقاً."
        />
      ) : filteredSessions.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
            {paginatedSessions.map((session) => (
              <MajlisCard key={session.id} {...session} />
            ))}
          </div>

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
        </>
      ) : (
        <EmptyState
          title="لا توجد مجالس"
          description="لم نتمكن من العثور على أي مجالس تطابق الفلتر الحالي."
        />
      )}
    </div>
  );
}

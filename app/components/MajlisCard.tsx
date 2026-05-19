import { User, Share2 } from "lucide-react";
import { cn } from "../lib/utils";
import type { MajlisCardProps } from "../../types/types";

export default function MajlisCard({
  title,
  description,
  currentAttendees,
  totalPlaces,
  status = "upcoming",
  className,
}: MajlisCardProps) {
  return (
    <div className={cn("bg-white rounded-3xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[var(--slate-100)] p-5 relative flex flex-col h-full group hover:shadow-md transition-shadow", className)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(var(--deep-teal-900) 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}></div>

      {/* Top Badge */}
      <div className="flex justify-start mb-5 relative z-10">
        <span className={cn(
          "flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg shadow-sm",
          status === "current" ? "bg-[#e5ad3a] text-white" :
          status === "upcoming" ? "bg-[var(--deep-teal-800)] text-white" :
          "bg-[var(--slate-400)] text-white"
        )}>
          {status === "current" && <span className="w-1.5 h-1.5 rounded-full bg-white opacity-90" />}
          {status === "current" ? "مباشر الآن" : status === "upcoming" ? "مجدول" : "سابق"}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 relative z-10">
        <h3 className="text-xl font-bold text-[var(--deep-teal-900)] text-start leading-relaxed mb-4">
          {title}
        </h3>

        <p className="text-sm text-[#8eacac] text-start leading-relaxed mb-6 font-medium px-2">
          {description}
        </p>

        {/* Attendance */}
        <div className="flex justify-start items-center gap-2 mb-6 mt-auto">
          <User className="w-5 h-5 text-[var(--deep-teal-900)]" />
          <span className="text-[var(--deep-teal-900)] font-bold text-sm tracking-widest">{currentAttendees} / {totalPlaces}</span>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center gap-3 relative z-10 mt-auto border-t border-[var(--slate-50)] pt-5">
        <button className="flex-1 bg-[var(--deep-teal-900)] text-white py-3 rounded-[14px] shadow-sm hover:bg-[#033b47] transition-colors text-sm">
          الانضمام الآن
        </button>
        <button className="p-3 text-[var(--deep-teal-900)] hover:bg-[var(--deep-teal-50)] rounded-[14px] transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

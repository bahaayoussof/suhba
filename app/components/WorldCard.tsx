import { Globe2, Users as UsersIcon } from "lucide-react";
import type { WorldCardProps } from "../../types/types";

export default function WorldCard({ name, description, memberCount, coverImage }: WorldCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--slate-100)] hover:shadow-md transition-shadow group flex flex-col h-full">
      <div className="relative h-40 w-full bg-[var(--slate-100)] overflow-hidden">
        <img
          src={coverImage}
          alt={name}
          className="w-full h-full object-cover"
        />

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

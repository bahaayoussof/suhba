import { CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { useAppStore } from "../../store/useAppStore";
import { useWorldsQuery } from "../../hooks/useQueries";

export default function Step1BasicInfo() {
  const formData = useAppStore((state) => state.wizardData);
  const updateFormData = useAppStore((state) => state.updateWizardData);
  const { data: worlds, isLoading } = useWorldsQuery();

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-bold text-[var(--slate-600)] mb-3">
          عنوان الجلسة
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateFormData("title", e.target.value)}
          placeholder="مثال: تحفيظ سورة الفتح ١"
          className="w-full px-4 py-3.5 bg-[#f8fafa] border border-transparent rounded-[10px] focus:border-[var(--deep-teal-900)] focus:ring-1 focus:ring-[var(--deep-teal-900)] outline-none transition-all placeholder-[var(--slate-300)] text-[var(--deep-teal-900)]"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[var(--slate-600)] mb-3">
          اختيار البيئة
        </label>
        {isLoading ? (
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
             {[1, 2, 3].map(i => (
               <div key={i} className="flex-none w-60 h-44 bg-slate-100 animate-pulse rounded-[12px]"></div>
             ))}
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x scroll-smooth">
            {worlds?.map((world: any) => {
              const isSelected = formData.environmentId === world.id;
              return (
                <div
                  key={world.id}
                  onClick={() => updateFormData("environmentId", world.id)}
                  className={cn(
                    "flex-none w-60 relative flex flex-col border-[1.5px] rounded-[12px] cursor-pointer transition-all overflow-hidden snap-center",
                    isSelected
                      ? "border-[#f5a623] shadow-sm bg-[#faf8f5]"
                      : "border-[var(--slate-100)] bg-white hover:border-[var(--slate-200)]"
                  )}
                >
                  <div className="h-28 bg-[#f4f6f6] w-full overflow-hidden flex items-center justify-center">
                    {world.coverImage ? (
                      <img src={world.coverImage} alt={world.name} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-14 h-14 text-[#cbd3d3]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>
                      </svg>
                    )}
                  </div>

                  <div className="p-3 flex flex-col items-center">
                    <h4 className={cn("text-sm font-bold mb-1 text-center line-clamp-1 w-full", isSelected ? "text-[var(--deep-teal-900)]" : "text-[var(--deep-teal-900)]")}>
                      {world.name}
                    </h4>
                    <p className="text-xs text-[#7e9b9c] text-center line-clamp-1 w-full">{world.description}</p>
                  </div>

                  {isSelected && (
                    <div className="absolute top-3 left-3 bg-[#f5a623] text-white rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-bold text-[var(--slate-600)] mb-3">
          وصف الجلسة
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormData("description", e.target.value)}
          placeholder="صف بإيجاز ما سيتعلمه الطلاب..."
          rows={3}
          className="w-full px-4 py-3.5 bg-[#f8fafa] border border-transparent rounded-[10px] focus:border-[var(--deep-teal-900)] focus:ring-1 focus:ring-[var(--deep-teal-900)] outline-none transition-all placeholder-[var(--slate-300)] resize-none text-[var(--deep-teal-900)]"
        />
      </div>
    </div>
  );
}

import { CheckCircle2 } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";

export default function Step6Success() {
  const formData = useAppStore((state) => state.wizardData);

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center h-full">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
        <CheckCircle2 className="w-12 h-12" />
      </div>
      <h2 className="text-2xl font-bold text-[var(--deep-teal-900)] mb-2">تم نشر الجلسة بنجاح!</h2>
      <p className="text-[var(--slate-500)] max-w-md mx-auto mb-8">
        أصبح مجلسك "{formData.title || "بدون عنوان"}" متاحاً الآن ويمكن للأعضاء الانضمام إليه.
      </p>
    </div>
  );
}

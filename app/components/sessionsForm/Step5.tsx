import React from "react";
import { Calendar, Clock, MapPin, Image as ImageIcon, FileText, Check } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { useWorldsQuery } from "../../hooks/useQueries";
import { toArabicNums } from "~/lib/utils";

interface SummaryCardProps {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}

function SummaryCard({ title, onEdit, children }: SummaryCardProps) {
  return (
    <div className="bg-white border border-[#eef2f2] border-r-3 border-r-[var(--deep-teal-900,#044b59)] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] relative">
      <button
        onClick={onEdit}
        className="absolute top-6 left-6 text-[var(--deep-teal-900,#044b59)] font-bold text-sm cursor-pointer bg-transparent border-none outline-none hover:underline"
      >
        تعديل
      </button>

      <div className="space-y-4 text-right">
        <h4 className="font-semibold text-[var(--deep-teal-900,#044b59)] text-xl">
          {title}
        </h4>
        {children}
      </div>
    </div>
  );
}

export default function Step5Summary() {
  const formData = useAppStore((state) => state.wizardData);
  const setWizardStep = useAppStore((state) => state.setWizardStep);
  const { data: worlds } = useWorldsQuery();

  const selectedWorld =
    worlds?.find((w: any) => w.id === formData.environmentId) || worlds?.[0];

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "October 24, 2023"; // Fallback to mockup default
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return "10:00 AM — 11:30 AM"; // Fallback to mockup default
    return timeStr;
  };

  return (
    <div className="space-y-6">
      {/* Basic Info Card */}
      <SummaryCard title="معلومات اساسية" onEdit={() => setWizardStep(1)}>
        <div className="space-y-6">
          {/* Title & Category Row */}
          <div className="flex justify-between items-start gap-4 max-w-[85%]">
            <div className="flex flex-col gap-1.5 text-right">
              <span className="text-xs text-[var(--slate-400)] font-medium">
                عنوان الجلسة
              </span>
              <h4 className="font-semibold text-[var(--deep-teal-900,#044b59)] text-lg leading-relaxed">
                {formData.title || "عنوان غير محدد"}
              </h4>
            </div>

            <div className="flex flex-col gap-1.5 min-w-[70px] text-right">
              <span className="text-xs text-[var(--slate-400)] font-medium">
                فئة
              </span>
              <div className="bg-[#eef2f2] text-[var(--deep-teal-900,#044b59)] font-bold text-xs px-3 py-1.5 rounded-lg text-center">
                تحفيظ
              </div>
            </div>
          </div>

          {/* Virtual World Section */}
          <div className="flex flex-col gap-2 text-right">
            <span className="text-xs text-[var(--slate-400)] font-medium">
              العالم الافتراضي
            </span>
            <div className="bg-[#f8fafa] border border-[#eef2f2] rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#eef2f2] overflow-hidden flex items-center justify-center flex-shrink-0">
                  {selectedWorld?.coverImage ? (
                    <img
                      src={selectedWorld.coverImage}
                      alt={selectedWorld.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <MapPin className="w-6 h-6 text-[var(--slate-400)]" />
                  )}
                </div>
                <div className="flex flex-col text-right">
                  <span className="font-bold text-[var(--deep-teal-900,#044b59)] text-sm">
                    {selectedWorld?.name}
                  </span>
                  <span className="text-xs text-[#7e9b9c] mt-0.5">
                    عدد الزائرين: {toArabicNums(formData.visitorsLimit)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SummaryCard>

      {/* Date & Time Card */}
      <SummaryCard title="الوقت والتاريخ" onEdit={() => setWizardStep(2)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Info */}
          <div className="flex flex-col gap-2 text-right">
            <span className="text-xs text-[var(--slate-400)] font-medium">
              التاريخ
            </span>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#eef2f2] flex items-center justify-center text-[var(--deep-teal-900,#044b59)] flex-shrink-0">
                <Calendar className="w-5 h-5 text-[var(--deep-teal-900,#044b59)]" />
              </div>
              <span className="font-extrabold text-[var(--deep-teal-900,#044b59)] text-sm">
                {formatDate(formData.date)}
              </span>
            </div>
          </div>

          {/* Time Info */}
          <div className="flex flex-col gap-2 text-right">
            <span className="text-xs text-[var(--slate-400)] font-medium">
              الوقت
            </span>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#eef2f2] flex items-center justify-center text-[var(--deep-teal-900,#044b59)] flex-shrink-0">
                <Clock className="w-5 h-5 text-[var(--deep-teal-900,#044b59)]" />
              </div>
              <span
                className="font-extrabold text-[var(--deep-teal-900,#044b59)] text-sm"
                dir="ltr"
              >
                {formatTime(formData.time)}
              </span>
            </div>
          </div>
        </div>
      </SummaryCard>

      {/* Media Card (Step 3 Summary) */}
      <SummaryCard title="وسائط المجلس" onEdit={() => setWizardStep(3)}>
        {formData.files.length === 0 ? (
          <p className="text-sm text-[var(--slate-400)] font-medium">
            لم يتم تحميل أي ملفات.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" dir="ltr">
            {formData.files.map((file) => (
              <div
                key={file.id}
                className="bg-[#f8fafa] border border-[#eef2f2] rounded-xl p-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#eef2f2] flex items-center justify-center text-[var(--slate-400)] flex-shrink-0">
                  {file.type === "JPG" ||
                  file.type === "PNG" ||
                  file.type === "JPEG" ? (
                    <ImageIcon className="w-5 h-5 text-[var(--deep-teal-900)]" />
                  ) : (
                    <FileText className="w-5 h-5 text-[var(--deep-teal-900)]" />
                  )}
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span
                    className="font-bold text-sm text-[var(--deep-teal-900)] truncate max-w-[150px]"
                    title={file.name}
                  >
                    {file.name}
                  </span>
                  <span className="text-[10px] text-[var(--slate-400)] font-medium truncate">
                    {file.size}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </SummaryCard>

      {/* Settings Card (Step 4 Summary) */}
      <SummaryCard title="إعدادات وقواعد المجلس" onEdit={() => setWizardStep(4)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visitors Limit */}
          <div className="flex flex-col gap-1.5 text-right">
            <span className="text-xs text-[var(--slate-400)] font-medium">
              سعة الحضور القصوى
            </span>
            <span className="font-bold text-[var(--deep-teal-900)] text-sm">
              {toArabicNums(formData.visitorsLimit)} زائر
            </span>
          </div>

          {/* Selected Rules */}
          <div className="flex flex-col gap-2 text-right">
            <span className="text-xs text-[var(--slate-400)] font-medium">
              القواعد المفعلة
            </span>
            <div className="flex flex-wrap gap-2 justify-start">
              {formData.raiseHand && (
                <span className="bg-[#eef2f2] text-[var(--deep-teal-900)] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[var(--deep-teal-900)]" />
                  ارفع يدك قبل التحدث
                </span>
              )}
              {formData.muteOnEntry && (
                <span className="bg-[#eef2f2] text-[var(--deep-teal-900)] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[var(--deep-teal-900)]" />
                  كتم الصوت عند الدخول
                </span>
              )}
              {formData.allowChat && (
                <span className="bg-[#eef2f2] text-[var(--deep-teal-900)] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[var(--deep-teal-900)]" />
                  دردشة عامة
                </span>
              )}
              {formData.isPrivate && (
                <span className="bg-[#eef2f2] text-[var(--deep-teal-900)] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[var(--deep-teal-900)]" />
                  غرفة خاصة
                </span>
              )}
              {!formData.raiseHand &&
                !formData.muteOnEntry &&
                !formData.allowChat &&
                !formData.isPrivate && (
                  <span className="text-xs text-[var(--slate-400)] font-medium">
                    لا توجد قواعد مفعّلة
                  </span>
                )}
            </div>
          </div>
        </div>
      </SummaryCard>
    </div>
  );
}

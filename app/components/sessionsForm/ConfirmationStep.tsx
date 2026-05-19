import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ThumbsUp,
  Link as LinkIcon,
  Copy,
  Check,
  Calendar,
  Clock,
  Box,
  Image as ImageIcon,
  ArrowLeft,
  Plus,
} from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { useWorldsQuery } from "../../hooks/useQueries";

export default function ConfirmationStep() {
  const formData = useAppStore((state) => state.wizardData);
  const resetWizard = useAppStore((state) => state.resetWizard);
  const navigate = useNavigate();
  const { data: worlds } = useWorldsQuery();

  const selectedWorld =
    worlds?.find((w: any) => w.id === formData.environmentId) || worlds?.[0];

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Generate stable mock values for access details
  const [sessionLink] = useState(() => `suhba.app/i/auth_${Math.random().toString(36).substring(2, 12)}`);
  const [sessionCode] = useState("1234ffee121");

  const copyToClipboard = async (text: string, type: "link" | "code") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "link") {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } else {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "October 24, 2023";
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
    if (!timeStr) return "14:00 — 15:30 EST";
    return timeStr;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-2 text-center"  >
      {/* Top Header Section */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-16 h-16 rounded-full border-2 border-[var(--deep-teal-900)] flex items-center justify-center text-[var(--deep-teal-900)] mb-4 bg-white shadow-sm">
          <ThumbsUp className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-[var(--deep-teal-900)] mb-2">تم نشر الجلسة</h2>
        <p className="text-[var(--slate-400)] text-sm max-w-lg leading-relaxed">
          جلستك جاهزة للتفاعل، ويمكن للمشاركين الانضمام إليها، فلتبدأ رحلة التعاون.
        </p>
      </div>

      {/* Two Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full max-w-5xl items-stretch">

 {/* Right Card - Session Info (Colspan 5) */}
        <div className="md:col-span-5 bg-white border border-[#eef2f2] rounded-[24px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.015)] flex flex-col justify-between text-right">
          <div className="space-y-2">
            {/* Header */}
            <div className="space-y-1">
              <span className="text-[11px] text-[var(--slate-400)] font-bold">هوية الجلسة</span>
              <h4 className="font-extrabold text-[var(--deep-teal-900)] text-md leading-relaxed">
                {formData.title}
              </h4>
            </div>

            {/* Details Stack */}
            <div className="space-y-4 pt-2 border-t border-[#eef2f2]">
              {/* Date */}
              <div className="flex items-center gap-3 text-right"  >
                <div className="w-9 h-9 rounded-lg bg-[#f2f7f7] flex items-center justify-center text-[var(--deep-teal-900)] flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-[var(--slate-400)] font-bold font-sans">التاريخ</span>
                  <span className="font-extrabold text-[var(--deep-teal-900)] text-sm">{formatDate(formData.date)}</span>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-3 text-right"  >
                <div className="w-9 h-9 rounded-lg bg-[#f2f7f7] flex items-center justify-center text-[var(--deep-teal-900)] flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-[var(--slate-400)] font-bold font-sans">الوقت</span>
                  <span className="font-extrabold text-[var(--deep-teal-900)] text-sm" dir="ltr">{formatTime(formData.time)}</span>
                </div>
              </div>

              {/* Environment */}
              <div className="flex items-center gap-3 text-right"  >
                <div className="w-9 h-9 rounded-lg bg-[#f2f7f7] flex items-center justify-center text-[var(--deep-teal-900)] flex-shrink-0">
                  <Box className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-[var(--slate-400)] font-bold font-sans">البيئة</span>
                  <span className="font-extrabold text-[var(--deep-teal-900)] text-sm">{selectedWorld?.name || "عالم غير محدد"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Environment Image Thumbnail */}
          <div className="w-full h-36 bg-[#f8fafa] border border-[#eef2f2] rounded-xl overflow-hidden mt-6 flex items-center justify-center relative">
            {selectedWorld?.coverImage ? (
              <img
                src={selectedWorld.coverImage}
                alt={selectedWorld.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-[var(--slate-300)]">
                <ImageIcon className="w-10 h-10 stroke-[1.5]" />
              </div>
            )}
          </div>
        </div>

        {/* Left Card - Action / Links (Colspan 7) */}
        <div className="md:col-span-7 bg-white border border-[#eef2f2] rounded-[24px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.015)] flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2 justify-start text-[var(--deep-teal-900)]">
              <h3 className="font-extrabold text-md">شارك مع جمهورك</h3>
              <LinkIcon className="w-5 h-5" />
            </div>

            {/* Public Access Link */}
            <div className="space-y-2 text-right">
              <label className="text-[11px] text-[var(--slate-400)] font-bold">رابط الوصول العام</label>
              <div className="flex items-center justify-between bg-[#f2f7f7] border border-[#e2ecec] p-1 rounded-xl">
                <span className="text-[var(--deep-teal-900)] font-bold text-sm select-all pr-2" >
                  {sessionLink}
                </span>
                <button
                  onClick={() => copyToClipboard(sessionLink, "link")}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[var(--deep-teal-900)] hover:bg-slate-50 rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer border border-[#e2ecec]"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-600 font-extrabold">تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Instructor Access Code */}
            <div className="space-y-2 text-right">
              <label className="text-[11px] text-[var(--slate-400)] font-bold">رمز دخول المدرب</label>
              <div className="flex items-center justify-between bg-[#f2f7f7] border border-[#e2ecec] p-3 rounded-xl"  >
                <span className="text-[var(--deep-teal-900)] font-bold text-sm select-all pr-2" dir="ltr">
                  {sessionCode}
                </span>
                <button
                  onClick={() => copyToClipboard(sessionCode, "code")}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[var(--deep-teal-900)] hover:bg-slate-50 rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer border border-[#e2ecec]"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-600 font-extrabold">تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Buttons Footer inside Left Card */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full"  >
            {/* Add New Session */}
            <button
              onClick={() => {
                resetWizard();
                navigate("/dashboard/sessions/new");
              }}
              className="flex-1 flex items-center justify-center gap-1 p-2 bg-white text-[var(--deep-teal-900)] font-semibold rounded-xl border border-[var(--deep-teal-900)] hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>اضافة جلسة جديدة</span>
            </button>

            {/* Go to Main/Sessions */}
            <button
              onClick={() => {
                resetWizard();
                navigate("/dashboard/sessions");
              }}
              className="flex-1 flex items-center justify-center gap-2 p-3 bg-[var(--deep-teal-900)] text-white font-semibold rounded-xl shadow-sm hover:bg-[#033b47] transition-colors cursor-pointer border-0"
            >
              <span>ذهاب للرئيسية</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>



      </div>
    </div>
  );
}

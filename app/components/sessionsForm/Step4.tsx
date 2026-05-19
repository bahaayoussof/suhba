import { Hand, MicOff, MessageSquare, Lock, ClipboardList, Check } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { toArabicNums } from "~/lib/utils";



export default function Step4Review() {
  const formData = useAppStore((state) => state.wizardData);
  const updateFormData = useAppStore((state) => state.updateWizardData);

  const visitorsLimit = formData.visitorsLimit || 25;

  const rules = [
    {
      id: "raiseHand",
      title: "ارفع يدك قبل التحدث",
      subtitle: "شجع الحضور الفعال",
      icon: <Hand className="w-5 h-5" />,
      field: "raiseHand" as const,
    },
    {
      id: "muteOnEntry",
      title: "كتم الصوت عند الدخول",
      subtitle: "حافظ على هدوء المكان في البداية",
      icon: <MicOff className="w-5 h-5" />,
      field: "muteOnEntry" as const,
    },
    {
      id: "allowChat",
      title: "دردشة عامة",
      subtitle: "السماح للمشاركين بإرسال الرسائل",
      icon: <MessageSquare className="w-5 h-5" />,
      field: "allowChat" as const,
    },
    {
      id: "isPrivate",
      title: "غرفة خاصة",
      subtitle: "الدخول متاح فقط عبر الدعوات",
      icon: <Lock className="w-5 h-5" />,
      field: "isPrivate" as const,
    },
  ];

  // Calculate percentage for the slider background gradient (min: 1, max: 50)
  const sliderProgress = ((visitorsLimit - 1) / 49) * 100;

  return (
    <div className="space-y-6" dir="rtl">

      {/* Visitor Count Card */}
      <div className="bg-white rounded-[20px] p-6 border border-[#eef2f2] shadow-[0_2px_12px_rgba(0,0,0,0.01)] space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1 text-right">
            <span className="font-bold text-lg text-[var(--deep-teal-900)]">عدد الزائرين</span>
            <span className="text-xs text-[var(--slate-400)]">الحد الأقصى لعدد المشاركين المسموح به في الغرفة</span>
          </div>
          <div className="bg-[#eef2f2] text-[var(--deep-teal-900)] font-extrabold text-lg px-4 py-2.5 rounded-xl min-w-[50px] text-center">
            {toArabicNums(visitorsLimit)}
          </div>
        </div>

        <div className="relative pt-2">
          <input
            type="range"
            min="1"
            max="50"
            value={visitorsLimit}
            onChange={(e) => updateFormData("visitorsLimit", parseInt(e.target.value))}
            className="custom-slider"
            style={{
              background: `linear-gradient(to left, var(--deep-teal-900, #005a70) ${sliderProgress}%, #e2e8f0 ${sliderProgress}%)`
            }}
          />
        </div>
      </div>

      {/* Council Rules Container */}
      <div className="bg-[#f8fafa] rounded-[20px] p-6 border border-[#eef2f2] space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 justify-start">
          <div className="w-9 h-9 rounded-lg bg-[var(--deep-teal-900, #005a70)] flex items-center justify-center text-white flex-shrink-0">
            <ClipboardList className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-[var(--deep-teal-900)] text-md">
            قواعد استخدام المجلس (للمعلم)
          </h3>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map((rule) => {
            const isChecked = formData[rule.field];
            return (
              <div
                key={rule.id}
                onClick={() => updateFormData(rule.field, !isChecked)}
                className="bg-white border border-[#eef2f2] rounded-xl p-4 flex items-center justify-between shadow-[0_2px_6px_rgba(0,0,0,0.01)] hover:border-[var(--deep-teal-900, #005a70)] transition-all cursor-pointer select-none"
              >
                {/* Right: Icon & Text Info */}
                <div className="flex items-center gap-3">
                  <div className="text-[var(--deep-teal-900, #005a70)] flex-shrink-0">
                    {rule.icon}
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="font-bold text-sm text-[var(--deep-teal-900)]">
                      {rule.title}
                    </span>
                    <span className="text-[11px] text-[var(--slate-400)]">
                      {rule.subtitle}
                    </span>
                  </div>
                </div>

                {/* Left: Custom Checkbox */}
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                    isChecked
                      ? "bg-[var(--deep-teal-900,#005a70)] border-[var(--deep-teal-900,#005a70)] text-white"
                      : "bg-white border-slate-200 text-transparent"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

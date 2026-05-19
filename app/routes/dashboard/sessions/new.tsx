import { useNavigate } from "react-router";
import { ArrowLeft, X } from "lucide-react";
import { cn, toArabicNums } from "../../../lib/utils";
import { useAppStore } from "../../../store/useAppStore";
import Step1BasicInfo from "../../../components/sessionsForm/Step1";
import Step2DateTime from "../../../components/sessionsForm/Step2";
import Step3Media from "../../../components/sessionsForm/Step3";
import Step4Review from "../../../components/sessionsForm/Step4";
import Step5Summary from "../../../components/sessionsForm/Step5";
import Step6Success from "../../../components/sessionsForm/ConfirmationStep";

const STEPS = [
  "معلومات أساسية",
  "الوقت والتاريخ",
  "وسائط المجلس",
  "وسائط المجلس",
  "مراجعة تفاصيل الجلسة",
  "تم نشر الجلسة",
];

export default function NewSessionWizard() {
  const navigate = useNavigate();

  const currentStep = useAppStore((state) => state.wizardStep);
  const formData = useAppStore((state) => state.wizardData);
  const setWizardStep = useAppStore((state) => state.setWizardStep);
  const resetWizard = useAppStore((state) => state.resetWizard);

  const nextStep = () => setWizardStep(Math.min(currentStep + 1, 6));
  const prevStep = () => setWizardStep(Math.max(currentStep - 1, 1));

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          !!formData.title?.trim() &&
          !!formData.description?.trim() &&
          formData.environmentId !== null
        );
      case 2:
        return !!formData.date && !!formData.time;
      case 3:
        return (
          formData.files.length > 0 &&
          !formData.files.some((f) => f.status === "uploading")
        );
      case 4:
        return true;
      case 5:
        return (
          !!formData.title?.trim() &&
          !!formData.description?.trim() &&
          formData.environmentId !== null &&
          !!formData.date &&
          !!formData.time &&
          formData.files.length > 0 &&
          !formData.files.some((f) => f.status === "uploading")
        );
      default:
        return true;
    }
  };

  const bgStyle = {
    backgroundImage: "radial-gradient(var(--slate-200) 1.5px, transparent 1.5px)",
    backgroundSize: "40px 40px"
  };

  return (
    <div className="min-h-screen bg-[#fafcfc] flex items-center justify-center font-sans relative overflow-hidden py-12" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={bgStyle}></div>

      {currentStep === 6 ? (
        <div className="relative z-10 w-full max-w-5xl mx-auto p-6 md:p-10">
          <Step6Success />
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-4xl mx-auto p-6 md:p-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 relative">
            <div className="w-10"></div> {/* Spacer */}
            <h1 className="text-2xl font-extrabold text-[var(--deep-teal-900)] text-center absolute left-1/2 -translate-x-1/2">
              إضافة مجلس جديد
            </h1>
            <button
              onClick={() => {
                resetWizard();
                navigate("/dashboard/sessions");
              }}
              className="w-10 h-10 flex items-center justify-center text-[var(--slate-400)] hover:text-[var(--deep-teal-900)] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Step Indicator */}
          {currentStep < 6 && (
            <div className="flex flex-col items-center mb-10">
              <div className="flex gap-2 mb-3">
                {STEPS.slice(0, 5).map((_, index) => {
                  const stepNumber = index + 1;
                  const isActive = stepNumber === currentStep;
                  const isCompleted = stepNumber < currentStep;
                  return (
                    <div
                      key={index}
                      className={cn(
                        "h-1 w-10 rounded-full transition-colors",
                        isActive || isCompleted ? "bg-[var(--deep-teal-900)]" : "bg-[var(--slate-200)]"
                      )}
                    />
                  );
                })}
              </div>
              <div className="text-[var(--deep-teal-900)] font-bold text-sm">
                خطوة {toArabicNums(currentStep)}/{toArabicNums(5)}
              </div>
            </div>
          )}

          {/* Step Header */}
          {currentStep < 6 && (
            <div className="mb-6 text-center md:text-right">
              <h2 className="text-2xl font-extrabold text-[var(--deep-teal-900)] mb-2">
                {STEPS[currentStep - 1]}
              </h2>
              {currentStep === 1 && (
                <p className="text-sm text-[#7e9b9c]">
                  ابدأ بتسمية جلستك واختيار موضوع لها.
                </p>
              )}
              {currentStep === 3 && (
                <p className="text-sm text-[#7e9b9c]">
                  أضف مستنداتك هنا، ويمكنك تحميل ما يصل إلى 4 ملفات كحد أقصى.
                </p>
              )}
              {currentStep === 4 && (
                <p className="text-sm text-[#7e9b9c]">
                  يمكنك تحميل كل الصور لمجلسك لإضافتها إلى بيئتك
                </p>
              )}
              {currentStep === 5 && (
                <p className="text-sm text-[#7e9b9c]">
                  حدد حدود التفاعل وسعة مساحة العمل المكانية الخاصة بك.
                </p>
              )}
            </div>
          )}

          {/* Main Card */}
          <div className={cn(
            "mb-8",
            ![2, 5].includes(currentStep) ? "bg-white rounded-[24px] shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-[var(--slate-100)] p-8" : ""
          )}>
            {currentStep === 1 && <Step1BasicInfo />}
            {currentStep === 2 && <Step2DateTime />}
            {currentStep === 3 && <Step3Media />}
            {currentStep === 4 && <Step4Review />}
            {currentStep === 5 && <Step5Summary />}
          </div>

          {/* Footer Actions outside the card */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (currentStep > 1) {
                  prevStep();
                } else {
                  resetWizard();
                  navigate("/dashboard/sessions");
                }
              }}
              className="px-10 py-2.5 bg-white text-[var(--deep-teal-900)] font-bold rounded-[8px] border border-[var(--deep-teal-900)] hover:bg-slate-50 transition-colors"
            >
              {currentStep === 1 ? "إلغاء" : "السابق"}
            </button>

            <button
              onClick={nextStep}
              disabled={!isStepValid()}
              className="flex items-center gap-2 px-10 py-2.5 bg-[var(--deep-teal-900)] text-white font-bold rounded-[8px] shadow-sm hover:bg-[#033b47] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 5 ? "اضافة المجلس" : "التالي"}
              <ArrowLeft className="w-5 h-5 mr-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

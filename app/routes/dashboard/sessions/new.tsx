import { useEffect, useMemo, useRef } from "react";
import { useNavigate, useLocation, Outlet } from "react-router";
import { ArrowLeft, X } from "lucide-react";
import { cn, toArabicNums } from "../../../lib/utils";
import { useAppStore } from "../../../store/useAppStore";
import type {
  StepConfig,
  WizardHeaderProps,
  StepIndicatorProps,
  StepHeadingProps,
  WizardFooterProps,
} from "../../../../types";


const WIZARD_STEPS: StepConfig[] = [
  {
    label: "معلومات أساسية",
    subtitle: "ابدأ بتسمية جلستك واختيار موضوع لها.",
    path: "/dashboard/sessions/new",
    validate: (d) => !!d.title?.trim() && !!d.description?.trim() && d.environmentId !== null,
  },
  {
    label: "الوقت والتاريخ",
    path: "/dashboard/sessions/new/2",
    noCard: true,
    validate: (d) => !!d.date && !!d.time,
  },
  {
    label: "وسائط المجلس",
    subtitle: "أضف مستنداتك هنا، ويمكنك تحميل ما يصل إلى 4 ملفات كحد أقصى.",
    path: "/dashboard/sessions/new/3",
    validate: (d) => d.files.length > 0 && !d.files.some((f) => f.status === "uploading"),
  },
  {
    label: "وسائط المجلس",
    subtitle: "يمكنك تحميل كل الصور لمجلسك لإضافتها إلى بيئتك",
    path: "/dashboard/sessions/new/4",
    // No mandatory fields on this step
  },
  {
    label: "مراجعة تفاصيل الجلسة",
    subtitle: "حدد حدود التفاعل وسعة مساحة العمل المكانية الخاصة بك.",
    path: "/dashboard/sessions/new/5",
    noCard: true,
  },
];

const CONFIRMATION_PATH = "/dashboard/sessions/new/confirmation";

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function WizardHeader({ onClose }: WizardHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8 relative">
      <div className="w-10" /> {/* RTL spacer */}
      <h1 className="text-2xl font-extrabold text-[var(--deep-teal-900)] text-center absolute left-1/2 -translate-x-1/2">
        إضافة مجلس جديد
      </h1>
      <button
        onClick={onClose}
        className="w-10 h-10 flex items-center justify-center text-[var(--slate-400)] hover:text-[var(--deep-teal-900)] transition-colors"
        aria-label="إغلاق"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
}

function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center mb-10">
      <div className="flex gap-2 mb-3">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          return (
            <div
              key={i}
              className={cn(
                "h-1 w-10 rounded-full transition-colors",
                isActive || isCompleted ? "bg-[var(--deep-teal-900)]" : "bg-[var(--slate-200)]"
              )}
            />
          );
        })}
      </div>
      <div className="text-[var(--deep-teal-900)] font-bold text-sm">
        خطوة {toArabicNums(currentStep)}/{toArabicNums(totalSteps)}
      </div>
    </div>
  );
}

function StepHeading({ label, subtitle }: StepHeadingProps) {
  return (
    <div className="mb-6 text-center md:text-right">
      <h2 className="text-2xl font-extrabold text-[var(--deep-teal-900)] mb-2">{label}</h2>
      {subtitle && <p className="text-sm text-[#7e9b9c]">{subtitle}</p>}
    </div>
  );
}

function WizardFooter({ currentStep, isNextDisabled, onBack, onNext, isLastStep }: WizardFooterProps) {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onBack}
        className="px-10 py-2.5 bg-white text-[var(--deep-teal-900)] font-bold rounded-[8px] border border-[var(--deep-teal-900)] hover:bg-slate-50 transition-colors"
      >
        {currentStep === 1 ? "إلغاء" : "السابق"}
      </button>

      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className="flex items-center gap-2 px-10 py-2.5 bg-[var(--deep-teal-900)] text-white font-bold rounded-[8px] shadow-sm hover:bg-[#033b47] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLastStep ? "اضافة المجلس" : "التالي"}
        <ArrowLeft className="w-5 h-5 mr-1" />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Wizard Layout
// ---------------------------------------------------------------------------

const BG_STYLE = {
  backgroundImage: "radial-gradient(var(--slate-200) 1.5px, transparent 1.5px)",
  backgroundSize: "40px 40px",
};

/** Derive 1-based step number from the current URL pathname */
function useCurrentStep(pathname: string): number {
  return useMemo(() => {
    const clean = pathname.replace(/\/$/, "");
    const idx = WIZARD_STEPS.findIndex((s) => s.path === clean);
    if (idx !== -1) return idx + 1;
    if (clean.endsWith("/confirmation")) return 6;
    return 1;
  }, [pathname]);
}

export default function NewSessionWizard() {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = useAppStore((state) => state.wizardData);
  const setWizardStep = useAppStore((state) => state.setWizardStep);
  const resetWizard = useAppStore((state) => state.resetWizard);

  const currentStep = useCurrentStep(location.pathname);

  // Keep global store in sync with URL-derived step number
  useEffect(() => {
    setWizardStep(currentStep);
  }, [currentStep, setWizardStep]);

  // Returns true only when step N and every step before it pass validation
  const isStepValid = (zeroBasedIndex: number): boolean => {
    for (let i = 0; i <= zeroBasedIndex; i++) {
      const validate = WIZARD_STEPS[i]?.validate;
      if (validate && !validate(formData)) return false;
    }
    return true;
  };

  // skipGuardRef: set to true before any intentional reset+navigate so the
  // route guard doesn't intercept the cleared formData and redirect to step 1
  const skipGuardRef = useRef(false);

  // Route guard: redirect to the first step that fails validation
  useEffect(() => {
    if (skipGuardRef.current) {
      skipGuardRef.current = false;
      return;
    }
    // Skip guard on confirmation screen — wizard is already complete
    if (currentStep < 2 || currentStep === 6) return;
    for (let i = 0; i < currentStep - 1; i++) {
      if (!isStepValid(i)) {
        navigate(WIZARD_STEPS[i].path, { replace: true });
        break;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, formData]);

  const handleNext = () => {
    if (currentStep < WIZARD_STEPS.length) {
      navigate(WIZARD_STEPS[currentStep].path);
    } else if (currentStep === WIZARD_STEPS.length) {
      navigate(CONFIRMATION_PATH);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      navigate(WIZARD_STEPS[currentStep - 2].path);
    } else {
      skipGuardRef.current = true;
      resetWizard();
      navigate("/dashboard/sessions");
    }
  };

  const handleClose = () => {
    skipGuardRef.current = true;
    resetWizard();
    navigate("/dashboard/sessions");
  };

  const isConfirmation = currentStep === 6;
  const stepConfig = WIZARD_STEPS[currentStep - 1];
  const isNextDisabled = !isStepValid(currentStep - 1);

  return (
    <div
      className="min-h-screen bg-[#fafcfc] flex items-center justify-center font-sans relative overflow-hidden py-12"
      dir="rtl"
    >
      {/* Background dot pattern */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={BG_STYLE} />

      {isConfirmation ? (
        // Confirmation / success screen – no wizard chrome
        <div className="relative z-10 w-full max-w-5xl mx-auto p-6 md:p-10">
          <Outlet />
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-4xl mx-auto p-6 md:p-10">
          <WizardHeader onClose={handleClose} />

          <StepIndicator currentStep={currentStep} totalSteps={WIZARD_STEPS.length} />

          {stepConfig && <StepHeading label={stepConfig.label} subtitle={stepConfig.subtitle} />}

          {/* Main card – certain steps opt out of the card wrapper */}
          <div
            className={cn(
              "mb-8",
              stepConfig?.noCard
                ? ""
                : "bg-white rounded-[24px] shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-[var(--slate-100)] p-8"
            )}
          >
            <Outlet />
          </div>

          <WizardFooter
            currentStep={currentStep}
            isNextDisabled={isNextDisabled}
            onBack={handleBack}
            onNext={handleNext}
            isLastStep={currentStep === WIZARD_STEPS.length}
          />
        </div>
      )}
    </div>
  );
}

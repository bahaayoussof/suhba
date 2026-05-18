import { Check } from "lucide-react";
import { cn } from "./ui/utils";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Connecting Line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-[var(--slate-200)] z-0 rounded-full" />
        
        {/* Active Line Fill */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 h-1 bg-[var(--mint-500)] z-0 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 border-2",
                  isCompleted
                    ? "bg-[var(--mint-500)] border-[var(--mint-500)] text-white"
                    : isActive
                    ? "bg-white border-[var(--mint-500)] text-[var(--mint-600)]"
                    : "bg-white border-[var(--slate-200)] text-[var(--slate-400)]"
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
              </div>
              <span
                className={cn(
                  "absolute -bottom-8 text-xs font-medium w-max text-center transition-colors duration-300",
                  isActive ? "text-[var(--mint-700)]" : "text-[var(--slate-500)]"
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

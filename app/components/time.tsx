import { useState, useEffect, useRef } from "react";
import { Clock, ChevronDown } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { cn } from "../lib/utils";
import type { CustomSelectProps } from "../../types";

function CustomSelect({ value, onChange, options, dropdownHeightClass = "max-h-48" }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between bg-[#f8fafa] text-[var(--deep-teal-900)] font-bold text-sm py-4 px-4 rounded-[12px] outline-none cursor-pointer border border-transparent transition-all",
          isOpen ? "border-[var(--deep-teal-900)] shadow-sm bg-white" : "hover:bg-[#f2f5f5]"
        )}
      >
        <span>{value}</span>
        <ChevronDown className={cn("w-4 h-4 text-[#7e9b9c] transition-transform duration-200", isOpen && "transform rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-[var(--slate-100)]  shadow-lg overflow-hidden">
          <div className={cn(
            "overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--slate-200)] [&::-webkit-scrollbar-thumb]:rounded hover:[&::-webkit-scrollbar-thumb]:bg-[var(--slate-300)]",
            dropdownHeightClass
          )}>
            <div className="">
              {options.map((opt) => {
                const isSelected = opt === value;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onChange(opt);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full text-center py-2.5 text-sm font-bold transition-colors cursor-pointer block",
                      isSelected
                        ? "bg-[var(--deep-teal-900)] text-white"
                        : "text-[var(--deep-teal-900)] hover:bg-[#f4f6f6]"
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TimePicker() {
  const formData = useAppStore((state) => state.wizardData);
  const updateFormData = useAppStore((state) => state.updateWizardData);

  const getCurrentTime = () => {
    const now = new Date();
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, '0');
    const p = h >= 12 ? "PM" : "AM";
    h = h % 12;
    if (h === 0) h = 12;
    return { hour: String(h).padStart(2, '0'), minute: m, period: p };
  };

  const parseTime = (timeStr: string) => {
    if (!timeStr) return getCurrentTime();
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (match) {
      let h = match[1];
      const m = match[2];
      const p = match[3] ? match[3].toUpperCase() : (Number(h) >= 12 ? "PM" : "AM");
      if (!match[3] && Number(h) > 12) h = String(Number(h) - 12).padStart(2, '0');
      if (!match[3] && h === "00") h = "12";
      return { hour: h.padStart(2, '0'), minute: m, period: p };
    }
    return getCurrentTime();
  };

  const [timeState, setTimeState] = useState(parseTime(formData.time));

  useEffect(() => {
    const timeStr = `${timeState.hour}:${timeState.minute} ${timeState.period}`;
    if (formData.time !== timeStr) {
      updateFormData("time", timeStr);
    }
  }, [timeState, updateFormData, formData.time]);

  const updateTime = (key: keyof typeof timeState, value: string) => {
    setTimeState(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[var(--slate-50)] p-8 flex flex-col">
      <div className="flex justify-between items-center mb-10">
        <h3 className="font-bold text-[var(--deep-teal-900)] text-xl">اختر الوقت</h3>
        <Clock className="w-6 h-6 text-[#7e9b9c]" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center mb-10">
        <div className="text-[5.5rem] leading-none font-extrabold text-[var(--deep-teal-900)] tracking-tighter" dir="ltr">
          {timeState.hour}:{timeState.minute}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4" dir="ltr">
        {/* Hour Dropdown */}
        <CustomSelect
          value={timeState.hour}
          onChange={(val) => updateTime("hour", val)}
          options={Array.from({ length: 12 }).map((_, i) => String(i + 1).padStart(2, '0'))}
        />

         {/* Minute Dropdown */}
        <CustomSelect
          value={timeState.minute}
          onChange={(val) => updateTime("minute", val)}
          options={Array.from({ length: 60 }).map((_, i) => String(i).padStart(2, '0'))}
        />

        {/* AM/PM Dropdown */}
        <CustomSelect
          value={timeState.period}
          onChange={(val) => updateTime("period", val)}
          options={["AM", "PM"]}
        />
      </div>
    </div>
  );
}

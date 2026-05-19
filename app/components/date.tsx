import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronRight, ChevronLeft } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { cn } from "../lib/utils";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function DatePicker() {
  const formData = useAppStore((state) => state.wizardData);
  const updateFormData = useAppStore((state) => state.updateWizardData);

  const initialDate = formData.date ? new Date(formData.date) : new Date();
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());

  useEffect(() => {
    if (!formData.date) {
      const d = new Date();
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      updateFormData("date", `${yyyy}-${mm}-${dd}`);
    }
  }, [formData.date, updateFormData]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handleDateSelect = (day: number) => {
    const d = new Date(currentYear, currentMonth, day);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    updateFormData("date", `${yyyy}-${mm}-${dd}`);
  };

  const isSelectedDay = (day: number) => {
    if (!formData.date) return false;
    const [y, m, d] = formData.date.split("-").map(Number);
    return y === currentYear && m === currentMonth + 1 && d === day;
  };

  return (
    <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[var(--slate-50)] p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-[var(--deep-teal-900)] text-xl">اختر التاريخ</h3>
        <CalendarIcon className="w-6 h-6 text-[#7e9b9c]" />
      </div>

      <div className="bg-[#f8fafa] rounded-[16px] flex items-center justify-between px-4 py-3 mb-6" dir="ltr">
        <button onClick={handlePrevMonth} className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[var(--slate-600)] shadow-sm hover:bg-slate-50 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-bold text-[var(--deep-teal-900)] text-sm">
          {MONTHS[currentMonth]}, {currentYear}
        </span>
        <button onClick={handleNextMonth} className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[var(--slate-600)] shadow-sm hover:bg-slate-50 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7" dir="ltr">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-center text-[11px] font-bold text-[#7e9b9c] uppercase tracking-wider">
            {day}
          </div>
        ))}

        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const selected = isSelectedDay(day);
          return (
            <div key={day} className="flex justify-center items-center">
              <button
                onClick={() => handleDateSelect(day)}
                className={cn(
                  "w-10 h-10 flex items-center justify-center text-sm font-bold rounded-full transition-all",
                  selected
                    ? "bg-[var(--deep-teal-900)] text-white shadow-md transform scale-105"
                    : "text-[var(--deep-teal-900)] hover:bg-[#f4f6f6]"
                )}
              >
                {String(day).padStart(2, '0')}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

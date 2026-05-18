import { useNavigate } from "react-router";
import { UploadCloud, Calendar as CalendarIcon, Clock, ArrowRight, ArrowLeft, CheckCircle2, Shield } from "lucide-react";
import StepIndicator from "../../../components/StepIndicator";
import { cn } from "../../../components/ui/utils";
import { useAppStore } from "../../../store/useAppStore";

const STEPS = [
  "معلومات أساسية",
  "الوقت والتاريخ",
  "وسائط المجلس",
  "مراجعة تفاصيل الجلسة",
  "تم نشر الجلسة",
];

export default function NewSessionWizard() {
  const navigate = useNavigate();
  
  const currentStep = useAppStore((state) => state.wizardStep);
  const formData = useAppStore((state) => state.wizardData);
  const updateFormData = useAppStore((state) => state.updateWizardData);
  const setWizardStep = useAppStore((state) => state.setWizardStep);
  const resetWizard = useAppStore((state) => state.resetWizard);

  const nextStep = () => setWizardStep(Math.min(currentStep + 1, 5));
  const prevStep = () => setWizardStep(Math.max(currentStep - 1, 1));

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-12">
        <button 
          onClick={() => navigate("/dashboard/sessions")}
          className="flex items-center gap-2 text-[var(--slate-500)] hover:text-[var(--slate-900)] transition-colors mb-6 font-medium"
        >
          <ArrowRight className="w-4 h-4" />
          العودة للمجالس
        </button>
        <h1 className="text-3xl font-bold text-[var(--slate-900)] mb-8">إضافة مجلس جديد</h1>
        <StepIndicator currentStep={currentStep} steps={STEPS} />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-[var(--slate-100)] p-8 min-h-[400px] flex flex-col">
        <div className="flex-1">
          {currentStep === 1 && (
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-xl font-bold text-[var(--slate-800)] mb-4">المعلومات الأساسية</h2>
              
              <div>
                <label className="block text-sm font-medium text-[var(--slate-700)] mb-2">عنوان المجلس</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => updateFormData("title", e.target.value)}
                  placeholder="أدخل عنواناً مميزاً للمجلس..."
                  className="w-full px-4 py-3 border border-[var(--slate-200)] rounded-xl focus:ring-2 focus:ring-[var(--mint-500)] focus:border-[var(--mint-500)] outline-none transition-shadow"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--slate-700)] mb-2">وصف المجلس</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                  placeholder="اكتب وصفاً تفصيلياً عن محتوى وأهداف المجلس..."
                  rows={4}
                  className="w-full px-4 py-3 border border-[var(--slate-200)] rounded-xl focus:ring-2 focus:ring-[var(--mint-500)] focus:border-[var(--mint-500)] outline-none transition-shadow resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--slate-700)] mb-2">صورة الغلاف (اختياري)</label>
                <div className="border-2 border-dashed border-[var(--slate-200)] rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-[var(--slate-50)] hover:bg-[var(--slate-100)] transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--mint-500)] mb-3 shadow-sm group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-[var(--slate-600)] font-medium">اسحب وأفلت الصورة هنا</p>
                  <p className="text-sm text-[var(--slate-400)] mt-1">أو انقر لاختيار ملف (PNG, JPG حتى 5MB)</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-xl font-bold text-[var(--slate-800)] mb-4">الوقت والتاريخ</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--slate-700)] mb-2">تاريخ المجلس</label>
                  <div className="relative">
                    <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--slate-400)]" />
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => updateFormData("date", e.target.value)}
                      className="w-full pl-4 pr-12 py-3 border border-[var(--slate-200)] rounded-xl focus:ring-2 focus:ring-[var(--mint-500)] outline-none transition-shadow text-[var(--slate-700)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--slate-700)] mb-2">وقت البدء</label>
                  <div className="relative">
                    <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--slate-400)]" />
                    <input 
                      type="time" 
                      value={formData.time}
                      onChange={(e) => updateFormData("time", e.target.value)}
                      className="w-full pl-4 pr-12 py-3 border border-[var(--slate-200)] rounded-xl focus:ring-2 focus:ring-[var(--mint-500)] outline-none transition-shadow text-[var(--slate-700)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-xl font-bold text-[var(--slate-800)] mb-4">وسائط المجلس</h2>
              <p className="text-[var(--slate-500)] mb-4">يمكنك رفع ملفات عرض تقديمية، صور، أو مستندات ليتمكن الحضور من الوصول إليها.</p>
              
              <div className="border-2 border-dashed border-[var(--mint-200)] rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-[var(--mint-50)]">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[var(--mint-600)] mb-4 shadow-sm">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[var(--mint-900)] mb-1">رفع الملفات</h3>
                <p className="text-[var(--mint-700)] mb-6">اسحب وأفلت الملفات هنا، أو انقر للتصفح</p>
                <button className="px-6 py-2.5 bg-white text-[var(--mint-700)] font-bold rounded-xl border border-[var(--mint-200)] shadow-sm hover:bg-[var(--mint-50)] transition-colors">
                  اختيار الملفات
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-xl font-bold text-[var(--slate-800)] mb-4">مراجعة تفاصيل الجلسة</h2>
              
              <div className="bg-[var(--slate-50)] rounded-2xl p-6 border border-[var(--slate-100)] space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-[var(--slate-500)]">العنوان</span>
                  <span className="font-bold text-[var(--slate-900)]">{formData.title || "لم يتم الإدخال"}</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-[var(--slate-500)]">الوصف</span>
                  <span className="text-[var(--slate-800)]">{formData.description || "لم يتم الإدخال"}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[var(--slate-200)]">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-[var(--slate-500)]">التاريخ</span>
                    <span className="font-medium text-[var(--slate-900)]">{formData.date || "غير محدد"}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-[var(--slate-500)]">الوقت</span>
                    <span className="font-medium text-[var(--slate-900)]" dir="ltr">{formData.time || "غير محدد"}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-4">
                <div className="text-blue-500 mt-1"><Shield className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-1">شروط وسياسات صُحبة</h4>
                  <p className="text-sm text-blue-800 mb-3">بالنقر على المربع أدناه، أنت توافق على شروط الاستخدام وسياسة الخصوصية الخاصة بالمنصة وأن المحتوى الذي تقدمه لا ينتهك أي حقوق.</p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-blue-300"
                      checked={formData.rulesAccepted}
                      onChange={(e) => updateFormData("rulesAccepted", e.target.checked)}
                    />
                    <span className="text-sm font-medium text-blue-900">أوافق على الشروط والأحكام</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="flex flex-col items-center justify-center py-12 text-center h-full">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--slate-900)] mb-2">تم نشر الجلسة بنجاح!</h2>
              <p className="text-[var(--slate-500)] max-w-md mx-auto mb-8">
                أصبح مجلسك "{formData.title || "بدون عنوان"}" متاحاً الآن ويمكن للأعضاء الانضمام إليه.
              </p>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => { resetWizard(); navigate("/dashboard/sessions"); }}
                  className="px-6 py-3 bg-[var(--mint-600)] text-white font-bold rounded-xl shadow-sm hover:bg-[var(--mint-700)] transition-colors"
                >
                  الذهاب لمجالسي
                </button>
                <button 
                  onClick={() => { resetWizard(); navigate("/dashboard/worlds"); }}
                  className="px-6 py-3 bg-white text-[var(--slate-700)] font-bold rounded-xl border border-[var(--slate-200)] shadow-sm hover:bg-[var(--slate-50)] transition-colors"
                >
                  استكشاف العوالم
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {currentStep < 5 && (
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-[var(--slate-100)]">
            <button
              onClick={prevStep}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 font-bold rounded-xl transition-colors",
                currentStep === 1 
                  ? "opacity-0 pointer-events-none" 
                  : "text-[var(--slate-600)] hover:bg-[var(--slate-100)] bg-white border border-[var(--slate-200)]"
              )}
            >
              <ArrowRight className="w-5 h-5" />
              السابق
            </button>

            <button
              onClick={nextStep}
              disabled={currentStep === 4 && !formData.rulesAccepted}
              className="flex items-center gap-2 px-6 py-2.5 bg-[var(--mint-600)] text-white font-bold rounded-xl shadow-sm hover:bg-[var(--mint-700)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 4 ? "نشر المجلس" : "التالي"}
              {currentStep < 4 && <ArrowLeft className="w-5 h-5" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

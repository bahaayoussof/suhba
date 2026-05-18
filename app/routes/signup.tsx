import { Link, useNavigate } from "react-router";
import { Mail, Lock, User } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Store mock tokens
    localStorage.setItem("token", "mock_auth_token_xyz_123");
    sessionStorage.setItem("token", "mock_auth_token_xyz_123");
    // Simulate redirect
    navigate("/dashboard/sessions");
  };

  return (
    <div className="min-h-screen bg-[var(--warm-gray-50)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-[var(--mint-500)] flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-[var(--mint-200)]">
            ص
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--slate-900)]">
          إنشاء حساب جديد
        </h2>
        <p className="mt-2 text-center text-sm text-[var(--slate-500)]">
          انضم إلى صُحبة وابدأ في إنشاء مجالسك
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-[var(--slate-100)]">
          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[var(--slate-700)] mb-1"
              >
                الاسم الكامل
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[var(--slate-400)]" aria-hidden="true" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full pr-10 border-[var(--slate-300)] rounded-xl focus:ring-[var(--mint-500)] focus:border-[var(--mint-500)] sm:text-sm py-3 border px-4 outline-none transition-colors"
                  placeholder="الاسم"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--slate-700)] mb-1"
              >
                البريد الإلكتروني
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[var(--slate-400)]" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pr-10 border-[var(--slate-300)] rounded-xl focus:ring-[var(--mint-500)] focus:border-[var(--mint-500)] sm:text-sm py-3 border px-4 outline-none transition-colors"
                  placeholder="name@example.com"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[var(--slate-700)] mb-1"
              >
                كلمة المرور
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[var(--slate-400)]" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full pr-10 border-[var(--slate-300)] rounded-xl focus:ring-[var(--mint-500)] focus:border-[var(--mint-500)] sm:text-sm py-3 border px-4 outline-none transition-colors"
                  placeholder="••••••••"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[var(--mint-600)] hover:bg-[var(--mint-700)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--mint-500)] transition-colors"
              >
                إنشاء حساب
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--slate-200)]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[var(--slate-500)]">
                  لديك حساب بالفعل؟
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/"
                className="w-full flex justify-center py-3 px-4 border border-[var(--slate-300)] rounded-xl shadow-sm text-sm font-medium text-[var(--slate-700)] bg-white hover:bg-[var(--slate-50)] transition-colors"
              >
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

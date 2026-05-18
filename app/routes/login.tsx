import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Store mock tokens
    localStorage.setItem("token", "mock_auth_token_xyz_123");
    sessionStorage.setItem("token", "mock_auth_token_xyz_123");
    // Simulate redirect
    navigate("/dashboard/sessions");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(var(--deep-teal-900) 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }}></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="mb-10 text-center text-3xl font-extrabold text-[var(--deep-teal-900)]">
          مرحبا بك في صحبة
        </h2>
        
        <form className="space-y-5 px-4 sm:px-10" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-bold text-[var(--deep-teal-900)] mb-2 text-right"
            >
              اسم المستخدم
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="block w-full border border-[#8eacac] rounded-[10px] bg-[#f4f6f6] focus:ring-[var(--deep-teal-900)] focus:border-[var(--deep-teal-900)] sm:text-sm py-2.5 px-4 outline-none transition-colors text-left"
              placeholder="e.g. Example@email.com"
              dir="ltr"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-bold text-[var(--deep-teal-900)] mb-2 text-right"
            >
              الكود السري
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full border border-[#8eacac] rounded-[10px] bg-[#f4f6f6] focus:ring-[var(--deep-teal-900)] focus:border-[var(--deep-teal-900)] sm:text-sm py-2.5 px-4 outline-none transition-colors text-left"
              placeholder="e.g. 1122ww"
              dir="ltr"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-[10px] shadow-sm text-sm font-bold text-white bg-[var(--deep-teal-900)] hover:bg-[#033b47] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--deep-teal-900)] transition-colors"
            >
              تسجيل الدخول
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

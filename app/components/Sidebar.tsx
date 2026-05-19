import { NavLink, useNavigate } from "react-router";
import { DoorOpen, Users, Box, LogOut } from "lucide-react";
import { cn } from "../lib/utils";

export default function Sidebar() {
  const navigate = useNavigate();
  const navItems = [
    { name: "المجالس", path: "/dashboard/sessions", icon: Users },
    { name: "العوالم", path: "/dashboard/worlds", icon: Box },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="w-64 bg-white border-l border-[var(--slate-200)] flex flex-col justify-between flex-shrink-0 relative">
      {/* Subtle Background Pattern (Optional) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(var(--deep-teal-900) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 px-3 py-3 border-b border-[var(--deep-teal-900)] mx-4 border-opacity-30">
          <div className="w-12 h-12 rounded-xl bg-[var(--deep-teal-900)] flex items-center justify-center text-white flex-shrink-0">
            <DoorOpen className="w-6 h-6" />
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-[var(--deep-teal-900)] leading-tight">ذات</h1>
            <p className="text-[10px] text-[var(--deep-teal-700)] font-medium tracking-wide">واجهة الإدارة</p>
          </div>
        </div>

        <div className="px-4 mt-8">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm",
                    isActive
                      ? "bg-[var(--deep-teal-900)] text-white shadow-md"
                      : "text-[var(--deep-teal-900)] hover:bg-[var(--deep-teal-50)]"
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="py-4 border-t border-[var(--deep-teal-900)] mx-4 mb-3 border-opacity-30 relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--deep-teal-900)] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            CO
          </div>
          <div className="text-right">
            <p className="text-[10px] text-[var(--slate-400)] font-medium">اسم المستخدم</p>
            <p className="text-xs font-bold text-[var(--ocean-900)]">CO123QQ</p>
          </div>
        </div>
        <button onClick={handleLogout} className="text-[var(--deep-teal-900)] hover:text-[var(--deep-teal-700)] transition-colors p-2" aria-label="تسجيل الخروج">
          <LogOut className="w-6 h-6 rotate-180 cursor-pointer" />
        </button>
      </div>
    </aside>
  );
}

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("token") ?? sessionStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-[var(--warm-gray-50)] text-[var(--slate-900)] overflow-hidden">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

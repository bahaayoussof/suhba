import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

export default function Layout() {
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

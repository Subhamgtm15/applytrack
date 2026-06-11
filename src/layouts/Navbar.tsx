import { Bell, Menu, Moon, PlusCircle, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type NavbarProps = {
  onOpenSidebar: () => void;
};

export default function Navbar({ onOpenSidebar }: NavbarProps) {
  const location = useLocation();
  const pageTitle =
    location.pathname === "/applications"
      ? "Applications"
      : location.pathname === "/settings"
        ? "Settings"
        : location.pathname === "/addapplication"
          ? "Add Application"
          : "Dashboard";

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur lg:left-72">
      <div className="flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button
            className="rounded-full p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
            onClick={onOpenSidebar}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <p className="text-xl font-semibold tracking-tight text-slate-900">{pageTitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden w-64 md:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search applications..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300"
            />
          </div>

          <button className="rounded-full p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </button>

          <button className="rounded-full p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Theme">
            <Moon className="h-5 w-5" />
          </button>

          <Link
            to="/addapplication"
            className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            <PlusCircle className="h-4 w-4" />
            Add
          </Link>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
            A
          </div>
        </div>
      </div>
    </nav>
  )
}
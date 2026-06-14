import { Menu } from "lucide-react";

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <nav className="h-16 w-full bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6">

      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-slate-100"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="text-sm font-semibold text-slate-700">
          Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-xs text-slate-500">
          Welcome 
        </span>

        <div className="h-9 w-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
          U
        </div>
      </div>

    </nav>
  );
}
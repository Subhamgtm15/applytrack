import { Menu, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
type Props = {
  darkMode: boolean;
  toggleTheme: () => void;
  onMenuClick: () => void;
};


export default function Navbar({ darkMode, toggleTheme, onMenuClick }: Props) {
  const location = useLocation();
  const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/applications": "Applications",
    "/addapplication": "Add Application",
    "/settings": "Settings"
  }

  // {pathname: "/applications", search: "", hash: "", state: null, key: "default"}
  return (
    <nav className="h-16 w-full bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 dark:bg-slate-800 dark:border-slate-700">

      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {pageTitles[location.pathname]}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-yellow-500 " />
          ) : (
            <Moon className="h-5 w-5 text-gray-500" />
          )}
        </button>
        <span className="hidden sm:block text-xs text-slate-500 dark:text-slate-400">
          Welcome
        </span>

        <div className="h-9 w-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold dark:bg-indigo-500 ">
          U
        </div>
      </div>

    </nav>
  );
}
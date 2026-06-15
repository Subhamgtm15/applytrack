import { Link, useLocation } from "react-router-dom";
type Props = {
  open: boolean;
  onClose: () => void;
};
const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/applications", label: "Applications" },
  { to: "/addapplication", label: "Add Application" },
  { to: "/settings", label: "Settings" },
];

export default function Sidebar({ open, onClose, }: Props) {
  const location = useLocation(); // This hook gives us access to the current URL, which we can use to determine which nav item is active.
  // console.log(location); // {pathname: "/applications", search: "", hash: "", state: null, key: "default"}

  return (
    <>
      {/* overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden dark:bg-slate-900/80"
        />
      )}

      <aside
        className={`fixed lg:fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200 dark:bg-slate-900 dark:border-slate-700 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} overflow-y-auto pb-6`}
      >
        <div className="px-6 py-5 text-lg font-bold text-slate-900 dark:text-slate-100">
          ApplyTrack
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`block px-4 py-2 rounded-lg text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-400 ${isActive
                    ? "bg-indigo-50 text-indigo-600 font-medium dark:bg-indigo-700/20 dark:text-indigo-300"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
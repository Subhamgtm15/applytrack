import { Menu, Moon, Sun } from "lucide-react";
import { useLocation } from "react-router-dom";
import { logout } from "../services/api";
import { useState, useEffect, useRef, useContext} from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
type Props = {
  darkMode: boolean;
  toggleTheme: () => void;
  onMenuClick: () => void;
};


export default function Navbar({ darkMode, toggleTheme, onMenuClick }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/applications": "Applications",
    "/addapplication": "Add Application",
    "/settings": "Settings"
  }
  
  // Function to handle user logout
  const logoutUser = async () => {
    try {
      await logout();
      auth?.clearUser();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Fetch the current user's full name when the component mounts
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await fetchCurrentUser();
  //       setFullName(response.user.fullName);
  //     }
  //     catch (error) {
  //       console.error("Error fetching user:", error);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  const auth = useContext(AuthContext);
  const fullName = auth?.user?.fullName || "";
  const firstName = fullName.split(" ")[0];


  return (
    <nav className="h-16 w-full sticky top-0 z-50 backdrop-blur bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 dark:bg-slate-800 dark:border-slate-700 py-3">

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
          Welcome{firstName ? `, ${firstName}` : ""}
        </span>

        {/* Avatar dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="h-9 w-9 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center text-sm font-semibold dark:bg-indigo-500 dark:hover:bg-indigo-400 transition-colors"
          >
            {firstName ? firstName.charAt(0).toUpperCase() : ""}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1 z-50">
              <button
                onClick={() => { setDropdownOpen(false); logoutUser(); }}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

    </nav>
  );
}
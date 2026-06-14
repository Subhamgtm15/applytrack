import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export function MainLayout() {
  // Get initial value synchronously before first render
  const getInitialDarkMode = () => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  };

  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  // Apply theme and save to localStorage whenever it changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
  setDarkMode(prev => !prev);
};
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <div className="flex flex-1 flex-col lg:ml-64">

        {/* Navbar */}
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}